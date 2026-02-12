import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const trackName = formData.get('trackName') as string;
    const location = formData.get('location') as string;
    const surface = formData.get('surface') as string;
    const website = formData.get('website') as string;
    const info = formData.get('info') as string;

    await resend.emails.send({
      from: 'SO RC <noreply@superoffroadrc.com>',
      to: 'brianbengreenbaum@gmail.com',
      subject: `New Track Submission - ${trackName}`,
      html: `
        <h2>New Track Submission</h2>
        <p><strong>Track Name:</strong> ${trackName}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Surface:</strong> ${surface}</p>
        <p><strong>Website:</strong> ${website || 'Not provided'}</p>
        <p><strong>Additional Info:</strong> ${info || 'None'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
