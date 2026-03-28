import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const errorReport = {
      level: 'error',
      timestamp: body.timestamp || new Date().toISOString(),
      message: body.message || 'Unknown error',
      stack: body.stack || null,
      url: body.url || null,
      userAgent: body.userAgent || null,
      boundary: body.boundary || null,
      component: body.component || null,
      action: body.action || null,
    };

    // Structured log — in production this could be extended to:
    // - Send to Slack/Discord webhook
    // - Write to a database
    // - Forward to an external logging service
    console.error('[ErrorReport]', JSON.stringify(errorReport, null, 2));

    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
