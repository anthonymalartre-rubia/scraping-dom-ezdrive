/**
 * Lightweight error reporting utility.
 * Logs to console in development, POSTs to /api/report-error in production.
 */

const isDev = process.env.NODE_ENV === 'development';

/**
 * Report an error with context.
 * @param {Error|string} error - The error to report
 * @param {Record<string, any>} context - Additional context (component, action, etc.)
 */
export function reportError(error, context = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    ...context,
  };

  // Always log to console
  console.error('[ErrorReport]', payload);

  // In production, send to API endpoint
  if (!isDev && typeof window !== 'undefined') {
    try {
      fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silently fail — we don't want error reporting to cause more errors
      });
    } catch {
      // Silently fail
    }
  }
}
