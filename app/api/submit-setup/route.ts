// app/api/submit-setup/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';
import { isBot } from '@/lib/honeypot';
import { setupSubmissionSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    // 1. Rate limiting - 5 submissions per hour per IP
    const rateLimitResult = await rateLimit({
      interval: 60 * 60 * 1000, // 1 hour
      uniqueTokenPerInterval: 5,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();

    // 3. Honeypot check
    if (isBot(body.honeypot)) {
      // Silently reject bots (return success to fool them)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 4. Validate data with Zod
    const validatedData = setupSubmissionSchema.parse(body);

    // 5. Initialize Resend only when needed (not at build time)
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 6. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Setup Submission <submissions@superoffroadrc.com>',
      to: [validatedData.email],
      subject: `New Setup Submission: ${validatedData.driver}`,
      html: `
        <h2>New Setup Submission</h2>
        <p><strong>Driver:</strong> ${validatedData.driver}</p>
        <p><strong>Track:</strong> ${validatedData.track}</p>
        <p><strong>Surface:</strong> ${validatedData.surface}</p>
        ${validatedData.notes ? `<p><strong>Notes:</strong> ${validatedData.notes}</p>` : ''}
        <p><strong>Submitted by:</strong> ${validatedData.email}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send submission. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    // Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid submission data', details: error },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
