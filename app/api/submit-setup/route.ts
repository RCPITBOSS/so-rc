import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const track = formData.get('track') as string;
    const surface = formData.get('surface') as string;
    const date = formData.get('date') as string;
    const notes = formData.get('notes') as string;

    // For now, log the submission. In production, send email to brianbengreenbaum@gmail.com
    console.log('Setup submission:', { name, email, track, surface, date, notes });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
