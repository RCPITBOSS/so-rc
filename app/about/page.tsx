import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Super Offroad RC - a dedicated resource for Yokomo SO owners',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">About SO RC</h1>

        <div className="mt-8 space-y-8">
          <p className="text-lg leading-relaxed text-gray-300">
            Super Offroad RC is a dedicated resource for Yokomo SO owners and enthusiasts.
          </p>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">What You&apos;ll Find Here</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-[#111] p-5">
                <h3 className="mb-1 font-semibold text-yokomo-blue">Latest News</h3>
                <p className="text-sm text-gray-400">
                  New releases, updates, and announcements directly from Yokomo for the SO platform
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#111] p-5">
                <h3 className="mb-1 font-semibold text-yokomo-blue">Proven Setups</h3>
                <p className="text-sm text-gray-400">
                  Tested setups for different tracks and conditions, documented and organized for
                  easy reference
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#111] p-5">
                <h3 className="mb-1 font-semibold text-yokomo-blue">Product Reviews</h3>
                <p className="text-sm text-gray-400">
                  Honest reviews of new parts, upgrades, and accessories for the SO
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#111] p-5">
                <h3 className="mb-1 font-semibold text-yokomo-blue">Resources</h3>
                <p className="text-sm text-gray-400">
                  Manuals, documentation, tuning guides, and technical information in one
                  centralized location
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">Why This Site Exists</h2>
            <p className="leading-relaxed text-gray-300">
              The Yokomo SO is an incredible buggy, but information is scattered across forums,
              Facebook groups, and various websites. This site consolidates everything you need to
              stay informed and competitive.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              Whether you&apos;re a new SO owner or a seasoned racer, this is your go-to resource
              for staying current with the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
