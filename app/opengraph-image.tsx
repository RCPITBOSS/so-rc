// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Super Offroad RC - Yokomo SO Resource';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#3B82F6',
            marginBottom: 20,
          }}
        >
          Super Offroad RC
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#9CA3AF',
            textAlign: 'center',
          }}
        >
          Yokomo SO Resources, Tools & Community
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
