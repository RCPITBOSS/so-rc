import type { Metadata } from 'next';
import { SetupsContent } from '@/components/site/setups-content';

export const metadata: Metadata = {
  title: 'Setups',
  description: 'Tested Yokomo SO setups for different tracks and conditions',
};

export default function SetupsPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Setups</h1>
          <p className="mt-2 text-gray-400">
            Tested setups for different tracks and conditions. Filter by surface type.
          </p>
        </div>

        <SetupsContent />
      </div>
    </div>
  );
}
