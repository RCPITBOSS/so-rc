import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-yokomo-blue">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-white">Page Not Found</h2>
        <p className="mb-8 text-gray-400">
          Looks like this page took a wrong turn on the track.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-yokomo-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
