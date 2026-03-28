import { NextResponse } from 'next/server';
import { getRateLimitStatus } from '@/lib/rateLimit';

const MAX_ATTEMPTS = 5;

/**
 * GET /api/auth/rate-limit-check?path=/login
 *
 * Returns the current rate limit status for the caller's IP
 * on a given auth path, without incrementing the counter.
 */
export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const path = searchParams.get('path') || '/login';

  // Extract client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1';

  const key = `${ip}:${path}`;
  const status = getRateLimitStatus(key, MAX_ATTEMPTS);

  return NextResponse.json({
    remaining: status.remaining,
    maxAttempts: MAX_ATTEMPTS,
    resetAt: status.resetAt ? status.resetAt.toISOString() : null,
  });
}
