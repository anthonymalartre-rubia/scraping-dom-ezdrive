// Helpers de normalisation + validation pour les listes de prospection.
//
// Tous les contacts stockés doivent passer par normalizeContact() avant
// insertion pour garantir : email lowercase, phone E.164, trim partout.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Domaines personnels exclus du B2B (cohérence avec le filtre du scraping)
const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.fr', 'outlook.com',
  'outlook.fr', 'live.com', 'live.fr', 'yahoo.com', 'yahoo.fr', 'free.fr',
  'orange.fr', 'sfr.fr', 'wanadoo.fr', 'laposte.net', 'icloud.com', 'me.com',
  'mac.com', 'aol.com', 'protonmail.com', 'pm.me', 'gmx.com', 'gmx.fr',
  'tutanota.com', 'mail.com', 'yandex.com', 'bbox.fr', 'numericable.fr',
]);

/**
 * Normalise un numéro de téléphone en E.164 (+33XXXXXXXXX).
 * - Strip espaces, tirets, parenthèses, points
 * - Convertit 0X... (français) → +33X...
 * - Garde + si présent
 * - Retourne null si pas un numéro valide
 */
export function normalizePhone(raw) {
  if (!raw) return null;
  let phone = String(raw).trim().replace(/[\s().\-]/g, '');
  if (!phone) return null;

  // Déjà en E.164 ?
  if (/^\+\d{8,15}$/.test(phone)) return phone;

  // Format français 0XXXXXXXXX (10 chiffres) → +33XXXXXXXXX
  if (/^0\d{9}$/.test(phone)) {
    return '+33' + phone.slice(1);
  }

  // Format français 33XXXXXXXXX sans + (11 chiffres) → +33XXXXXXXXX
  if (/^33\d{9}$/.test(phone)) {
    return '+' + phone;
  }

  // International sans + (au moins 8 chiffres) → on préfixe + à condition
  // que ça ne commence pas par 0 (sinon ambigu)
  if (/^\d{8,15}$/.test(phone) && !phone.startsWith('0')) {
    return '+' + phone;
  }

  // Pas reconnu
  return null;
}

/**
 * Normalise un email : lowercase + trim.
 * Retourne null si format invalide.
 */
export function normalizeEmail(raw) {
  if (!raw) return null;
  const email = String(raw).trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return null;
  return email;
}

export function isPersonalEmail(email) {
  if (!email) return false;
  const domain = email.split('@')[1];
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

/**
 * Normalise et valide une ligne de contact issue d'un import CSV.
 * @returns {{ ok: boolean, contact?, error?, warnings? }}
 */
export function normalizeContact(raw) {
  const email = normalizeEmail(raw.email);
  const phone = normalizePhone(raw.phone || raw.telephone || raw.tel);

  if (!email && !phone) {
    return { ok: false, error: 'Email ou téléphone requis' };
  }

  const warnings = [];
  if (email && isPersonalEmail(email)) {
    warnings.push('Email personnel détecté (gmail/hotmail/etc.) — RGPD plus strict en B2C');
  }

  return {
    ok: true,
    contact: {
      email,
      phone,
      first_name: trim(raw.first_name || raw.firstname || raw.prenom),
      last_name: trim(raw.last_name || raw.lastname || raw.nom),
      company: trim(raw.company || raw.societe || raw.entreprise),
      position_title: trim(raw.position_title || raw.poste || raw.title || raw.job),
      custom_fields: extractCustomFields(raw),
    },
    warnings,
  };
}

function trim(v) {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length > 0 ? s : null;
}

// Tout champ qui n'est pas un standard ci-dessus est stocké en custom_fields
const STANDARD_FIELDS = new Set([
  'email', 'phone', 'telephone', 'tel',
  'first_name', 'firstname', 'prenom',
  'last_name', 'lastname', 'nom',
  'company', 'societe', 'entreprise',
  'position_title', 'poste', 'title', 'job',
]);

function extractCustomFields(raw) {
  const custom = {};
  for (const key of Object.keys(raw)) {
    const norm = key.toLowerCase().trim();
    if (STANDARD_FIELDS.has(norm)) continue;
    const v = trim(raw[key]);
    if (v != null) custom[norm] = v;
  }
  return Object.keys(custom).length > 0 ? custom : null;
}

/**
 * Parse un contenu CSV en lignes d'objets {col1: val1, col2: val2, ...}.
 * Détection auto séparateur (virgule, point-virgule, tab).
 * Gestion des guillemets pour les valeurs avec virgule.
 */
export function parseCsv(text) {
  if (!text || typeof text !== 'string') return { rows: [], headers: [] };

  // Détection du séparateur sur la 1re ligne
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  let sep = ',';
  if ((firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length) sep = ';';
  if ((firstLine.match(/\t/g) || []).length > 0) sep = '\t';

  // Parser simple gérant les guillemets
  const lines = [];
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === sep) {
        current.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        current.push(field);
        if (current.some((v) => v.length > 0)) lines.push(current);
        current = [];
        field = '';
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    if (current.some((v) => v.length > 0)) lines.push(current);
  }

  if (lines.length === 0) return { rows: [], headers: [] };

  const headers = lines[0].map((h) => h.trim().toLowerCase().replace(/^﻿/, ''));
  const rows = lines.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] ?? '').trim();
    });
    return obj;
  });

  return { rows, headers };
}
