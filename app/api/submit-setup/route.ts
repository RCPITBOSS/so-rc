import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const track = formData.get('track') as string;
    const surface = formData.get('surface') as string;
    const date = formData.get('date') as string;
    const notes = formData.get('notes') as string;
    const file = formData.get('file') as File | null;

    await resend.emails.send({
      from: 'SO RC <noreply@superoffroadrc.com>',
      to: 'brianbengreenbaum@gmail.com',
      subject: `New Setup Submission - ${track}`,
      html: `
        <h2>New Setup Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Track:</strong> ${track}</p>
        <p><strong>Surface:</strong> ${surface}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
        ${file ? `<p><strong>File:</strong> ${file.name} was uploaded</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
