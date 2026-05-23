// ─────────────────────────────────────────────────────────────────────
// Cache Google Places API (24h TTL) via Upstash Redis
// ─────────────────────────────────────────────────────────────────────
//
// Stratégie : 80%+ des recherches publiques dans le HeroSearchWidget
// vont sur les mêmes requêtes (presets : "restaurants Paris", "avocats
// Lyon", "hôtels Marseille"). Sans cache, on paie l'API Google Places
// à chaque essai. Avec cache 24h, on paie 1× pour 100+ visiteurs.
//
// Économie estimée : facteur ×5 à ×20 selon le traffic.
//
// Key format : "places:v1:{type}:{normalized_query}"
// Value : JSON serialisé du résultat brut Google Places
// TTL : 86400s (24h)
// ─────────────────────────────────────────────────────────────────────

import { getRedis } from './upstash';

const CACHE_TTL_SECONDS = 86400; // 24h
const KEY_PREFIX = 'places:v1';

/**
 * Génère une clé de cache déterministe à partir d'une query.
 * Normalise (lowercase, trim, sort) pour maximiser les hits.
 */
function buildKey(type, query) {
  const normalized = JSON.stringify(query, Object.keys(query).sort())
    .toLowerCase()
    .trim();
  return `${KEY_PREFIX}:${type}:${normalized}`;
}

/**
 * Récupère un résultat caché, ou null si pas en cache.
 * No-op si Redis pas configuré.
 */
export async function getCachedPlaces(type, query) {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const key = buildKey(type, query);
    const cached = await redis.get(key);
    return cached || null;
  } catch (err) {
    console.error('[places-cache] get error:', err);
    return null; // En cas d'erreur Redis, on continue sans cache
  }
}

/**
 * Stocke un résultat en cache pour 24h.
 * No-op si Redis pas configuré ou erreur (silencieux).
 */
export async function setCachedPlaces(type, query, data) {
  const redis = getRedis();
  if (!redis) return;

  try {
    const key = buildKey(type, query);
    await redis.set(key, data, { ex: CACHE_TTL_SECONDS });
  } catch (err) {
    console.error('[places-cache] set error:', err);
    // Silently fail — cache miss = pas grave, on ré-appellera l'API
  }
}
