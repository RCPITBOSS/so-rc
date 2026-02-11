import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const trackName = formData.get('trackName') as string;
    const location = formData.get('location') as string;
    const surface = formData.get('surface') as string;
    const website = formData.get('website') as string;
    const info = formData.get('info') as string;

    // For now, log the submission. In production, send email to brianbengreenbaum@gmail.com
    console.log('Track submission:', { trackName, location, surface, website, info });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
