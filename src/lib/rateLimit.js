/**
 * Rate limiting utility using in-memory Map.
 *
 * On Vercel serverless/edge, in-memory state is ephemeral — it only persists
 * within a single warm instance. This provides basic brute-force protection
 * (better than nothing) but is not a distributed rate limiter.
 *
 * For stronger guarantees, consider Vercel KV or Upstash Redis.
 */

const rateLimitStore = new Map();

// Clean up expired entries every 60 seconds to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check rate limit for a given identifier.
 *
 * @param {string} identifier - Unique key (e.g. IP address or IP+route)
 * @param {number} maxAttempts - Maximum allowed attempts within the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ success: boolean, remaining: number, resetAt: Date }}
 */
export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  cleanupExpiredEntries();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No existing entry or window expired — create fresh entry
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt,
    });
    return {
      success: true,
      remaining: maxAttempts - 1,
      resetAt: new Date(resetAt),
    };
  }

  // Within window — increment count
  entry.count += 1;

  if (entry.count > maxAttempts) {
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.resetAt),
    };
  }

  return {
    success: true,
    remaining: maxAttempts - entry.count,
    resetAt: new Date(entry.resetAt),
  };
}

/**
 * Get current rate limit status without incrementing the counter.
 *
 * @param {string} identifier - Unique key
 * @param {number} maxAttempts - Maximum allowed attempts within the window
 * @returns {{ remaining: number, resetAt: Date | null }}
 */
export function getRateLimitStatus(identifier, maxAttempts = 5) {
  const entry = rateLimitStore.get(identifier);
  const now = Date.now();

  if (!entry || now > entry.resetAt) {
    return { remaining: maxAttempts, resetAt: null };
  }

  const remaining = Math.max(0, maxAttempts - entry.count);
  return { remaining, resetAt: new Date(entry.resetAt) };
}
