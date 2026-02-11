import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Racing & Tuning Tips',
  description: 'Tips and guides for Yokomo SO racing and tuning',
};

export default function TipsPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Racing &amp; Tuning Tips
          </h1>
          <p className="mt-2 text-gray-400">
            Guides, tips, and tuning advice for Yokomo SO owners.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#111] py-20 text-center">
          <p className="text-lg text-gray-500">Tips and guides coming soon.</p>
        </div>
      </div>
    </div>
  );
}
