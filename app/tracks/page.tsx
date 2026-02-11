import type { Metadata } from 'next';
import { TracksContent } from '@/components/site/tracks-content';

export const metadata: Metadata = {
  title: 'Track Finder',
  description: 'Find RC tracks near you for Yokomo SO racing',
};

export default function TracksPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Track Finder
          </h1>
          <p className="mt-2 text-gray-400">
            Directory of RC tracks. Search and filter by location and surface type.
          </p>
        </div>

        <TracksContent />

        <div className="mt-10 rounded-lg border border-white/10 bg-[#111] p-6 text-center">
          <p className="text-sm text-gray-400">
            Track owners can submit tracks via our{' '}
            <a href="/submit" className="font-medium text-yokomo-blue hover:underline">
              Submit page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
