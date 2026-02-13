import type { Metadata } from 'next';
import { GearingCalculator } from '@/components/tools/gearing-calculator';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'RC racing tools and calculators for Yokomo SO',
};

export default function ToolsPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Racing Tools
          </h1>
          <p className="mt-2 text-gray-400">
            Calculators and tools to help you dial in your Yokomo SO setup
          </p>
        </div>

        {/* Gearing Calculator */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Gearing & Speed Calculator</h2>
          <p className="mb-6 text-gray-400">
            Calculate top speed, FDR, and motor RPM for your Yokomo SO with Hobbywing motors
          </p>
          <GearingCalculator />
        </div>

        {/* Placeholder for future tools */}
        <div className="rounded-lg border border-white/10 bg-[#111] p-8 text-center">
          <p className="text-gray-500">More tools coming soon...</p>
        </div>
      </div>
    </div>
  );
}
