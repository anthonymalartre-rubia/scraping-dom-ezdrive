// Envoi de SMS via Twilio (REST API directe — pas de SDK pour rester serverless-friendly).
//
// Env vars requises :
//   TWILIO_ACCOUNT_SID         (commence par AC...)
//   TWILIO_AUTH_TOKEN
//   TWILIO_FROM_NUMBER         (numéro Twilio acheté, ex +33756123456) ou TWILIO_MESSAGING_SERVICE_SID
//
// Tarification indicative (mai 2026) :
//   FR mobile : ~0.07 € / SMS standard (160 chars)
//   Au-delà : multi-part = 153 chars / part
//   On compte le coût estimé côté serveur pour afficher dans la UI.
//
// RGPD France : SMS = données perso, opt-out obligatoire ("STOP au 36111" gratuit).
//   On n'a pas de numéro court → footer texte « Répondez STOP pour ne plus recevoir ».
//   L'opt-out STOP entrant est géré par notre webhook (à brancher dans la console Twilio).

import { cleanEnv } from './envClean';

const TWILIO_API_BASE = 'https://api.twilio.com/2010-04-01';

// Compte le nombre de "segments" SMS d'un message (GSM-7 vs UCS-2)
export function countSmsSegments(text) {
  if (!text) return 0;
  const hasUnicode = /[^\x00-\x7F€£¥èéùìòÇØøÅåÆæßÉ!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_a-z{|}~ \r\n]/.test(text);
  const len = text.length;
  if (!hasUnicode) {
    // GSM-7 : 160 char single, 153 par segment pour multi-part
    if (len <= 160) return 1;
    return Math.ceil(len / 153);
  }
  // UCS-2 (caractères unicode, emojis, accents complexes) : 70 / 67
  if (len <= 70) return 1;
  return Math.ceil(len / 67);
}

// Estime le coût en EUR pour un SMS donné (cible FR mobile)
export function estimateSmsCostEur(text, segmentPriceEur = 0.07) {
  const segments = countSmsSegments(text);
  return Math.round(segments * segmentPriceEur * 10000) / 10000; // 4 décimales
}

// Normalise vers E.164 (sécurité : refuse les numéros non-mobiles évidents)
export function isMobileE164Fr(phone) {
  // FR mobile = +336 ou +337
  return /^\+33[67]\d{8}$/.test(phone);
}

export async function sendSms({ to, body, from }) {
  const accountSid = cleanEnv(process.env.TWILIO_ACCOUNT_SID);
  const authToken = cleanEnv(process.env.TWILIO_AUTH_TOKEN);
  const fromNumber = from || cleanEnv(process.env.TWILIO_FROM_NUMBER);
  const messagingServiceSid = cleanEnv(process.env.TWILIO_MESSAGING_SERVICE_SID);

  if (!accountSid || !authToken) {
    return { success: false, error: 'Twilio credentials missing (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)' };
  }
  if (!to || !body) {
    return { success: false, error: 'to and body are required' };
  }
  if (!fromNumber && !messagingServiceSid) {
    return { success: false, error: 'TWILIO_FROM_NUMBER or TWILIO_MESSAGING_SERVICE_SID required' };
  }

  const url = `${TWILIO_API_BASE}/Accounts/${accountSid}/Messages.json`;
  const form = new URLSearchParams();
  form.set('To', to);
  form.set('Body', body);
  if (messagingServiceSid) {
    form.set('MessagingServiceSid', messagingServiceSid);
  } else {
    form.set('From', fromNumber);
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || `Twilio HTTP ${res.status}`,
        code: data.code,
        status: res.status,
      };
    }
    return {
      success: true,
      id: data.sid,             // Twilio Message SID (commence par SM...)
      status: data.status,      // queued / sent / delivered ...
      priceEur: data.price ? Math.abs(parseFloat(data.price)) : null, // Twilio renvoie négatif
      segments: parseInt(data.num_segments || '1', 10),
    };
  } catch (err) {
    return { success: false, error: err.message || 'Twilio fetch error' };
  }
}

// Append le footer RGPD STOP obligatoire (compte dans les segments — important pour le coût !)
export function appendSmsOptOutFooter(text) {
  const footer = '\nSTOP au 36111 pour ne plus recevoir.';
  // Si le texte contient déjà "STOP" on évite le doublon
  if (/STOP/i.test(text)) return text;
  return text + footer;
}
