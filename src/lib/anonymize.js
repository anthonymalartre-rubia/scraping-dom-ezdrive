// ─────────────────────────────────────────────────────────────────────
// Anonymisation pour le preview public (HeroSearchWidget)
// ─────────────────────────────────────────────────────────────────────
//
// Stratégie "tronquer pour teaser" : on garde le 1er caractère de
// chaque mot + on remplace le reste par ***. L'user voit que c'est une
// vraie entreprise réelle (premier caractère réel) mais ne peut pas
// reconstituer le nom complet sans s'inscrire.
//
// Cette approche est :
// - RGPD-friendly : aucune donnée nominative identifiable
// - Plus honnête que générer des noms fictifs (qu'on présenterait
//   abusivement comme réels)
// - Plus crédible que rien (le visiteur sent que c'est une vraie data)
//
// Examples :
//   "Restaurant Le Procope" → "Restaurant L*** P***"
//   "Café du Coin"          → "Café d* C***"
//   "contact@procope.fr"    → "c***t@***.fr"
//   "06 12 34 56 78"        → "06 ** ** ** **"
// ─────────────────────────────────────────────────────────────────────

/**
 * Anonymise un nom d'entreprise en gardant le 1er caractère de chaque mot.
 * - Mots <= 2 caractères : laissés tels quels (ex: "Le", "du", "à", "&")
 * - Mots > 2 caractères : 1er caractère + "***"
 */
export function anonymizeName(name) {
  if (!name || typeof name !== 'string') return '???';
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 2) return word;
      // Préserver caractères spéciaux en tête (chiffres, &, etc.)
      const firstChar = word.charAt(0);
      return `${firstChar}***`;
    })
    .join(' ');
}

/**
 * Anonymise une adresse email en gardant le 1er et dernier char du local part,
 * + masquant le domaine (sauf TLD).
 *
 * Exemples :
 *   "contact@procope.fr"       → "c***t@***.fr"
 *   "hello@my-company.co.uk"   → "h***o@***.co.uk"
 *   "a@b.c"                    → "*@***.c" (cas edge minimal)
 */
export function anonymizeEmail(email) {
  if (!email || typeof email !== 'string') return '???@***';
  const at = email.lastIndexOf('@');
  if (at < 1) return '???@***';

  const local = email.substring(0, at);
  const domain = email.substring(at + 1);

  // Local part : garder 1er + dernier + *** au milieu si > 2 chars
  let anonLocal;
  if (local.length <= 1) anonLocal = '*';
  else if (local.length === 2) anonLocal = `${local[0]}*`;
  else anonLocal = `${local[0]}***${local[local.length - 1]}`;

  // Domain : remplacer par *** mais garder le TLD (ex: .fr, .co.uk)
  const domainParts = domain.split('.');
  let anonDomain;
  if (domainParts.length >= 3) {
    // Cas multi-TLD (.co.uk, .com.fr) : garder les 2 derniers
    anonDomain = `***.${domainParts.slice(-2).join('.')}`;
  } else if (domainParts.length === 2) {
    // Cas standard (.fr, .com) : garder le TLD
    anonDomain = `***.${domainParts[1]}`;
  } else {
    anonDomain = '***';
  }

  return `${anonLocal}@${anonDomain}`;
}

/**
 * Anonymise un numéro de téléphone en gardant les 2-3 premiers chiffres
 * (préfixe pays/opérateur), masquant le reste.
 *
 * Exemples :
 *   "01 40 46 79 00"     → "01 ** ** ** **"
 *   "06 12 34 56 78"     → "06 ** ** ** **"
 *   "+33 1 40 46 79 00"  → "+33 1 ** ** ** **"
 *   "0140467900"         → "01 ** ** ** **"
 */
export function anonymizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '** ** ** ** **';

  // Normalise : supprime espaces, points, tirets, parenthèses
  const digits = phone.replace(/[\s.\-()]/g, '');

  // Détecte le préfixe pays (+XX) ou local (0X)
  let prefix = '';
  let rest = digits;
  if (digits.startsWith('+')) {
    // +33, +44, etc. → garde le code pays
    const match = digits.match(/^\+(\d{1,3})/);
    if (match) {
      prefix = `+${match[1]}`;
      rest = digits.substring(prefix.length);
      // En FR, le 1er chiffre après +33 est souvent gardé visible
      if (prefix === '+33' && rest.length >= 1) {
        prefix = `+33 ${rest[0]}`;
        rest = rest.substring(1);
      }
    }
  } else if (digits.startsWith('0') && digits.length >= 2) {
    prefix = digits.substring(0, 2);
    rest = digits.substring(2);
  }

  // Masque le reste en groupes de 2
  const masked = rest.match(/.{1,2}/g)?.map(() => '**').join(' ') || '';
  return `${prefix} ${masked}`.trim();
}

/**
 * Anonymise une adresse postale en gardant la ville + code postal
 * mais masquant le numéro et le nom de rue.
 *
 * Exemples :
 *   "12 Rue de la République, 75011 Paris" → "** Rue d* l* R***, 75011 Paris"
 */
export function anonymizeAddress(address) {
  if (!address || typeof address !== 'string') return '*** ***';

  // On essaye d'isoler le code postal + ville (souvent en fin)
  const cpMatch = address.match(/(\d{5}\s+[A-Za-zÀ-ÿ\-\s]+)$/);
  if (cpMatch) {
    const before = address.substring(0, address.length - cpMatch[1].length).trim().replace(/,\s*$/, '');
    const anonBefore = anonymizeName(before.replace(/^\d+/, '**'));
    return `${anonBefore}, ${cpMatch[1].trim()}`;
  }

  // Sinon, on anonymise tout
  return anonymizeName(address);
}

/**
 * Anonymise un objet "prospect" complet pour le preview public.
 * Garde la note Google + nb d'avis (info publique non sensible).
 */
export function anonymizeProspect(prospect) {
  return {
    name: anonymizeName(prospect.name),
    address: anonymizeAddress(prospect.address || prospect.formatted_address || ''),
    email: prospect.email ? anonymizeEmail(prospect.email) : null,
    phone: prospect.phone || prospect.formatted_phone_number ? anonymizePhone(prospect.phone || prospect.formatted_phone_number) : null,
    website: prospect.website ? '***.fr' : null,
    rating: prospect.rating || null,
    user_ratings_total: prospect.user_ratings_total || null,
    // Indicateur visuel pour la UI
    anonymized: true,
  };
}
