import type { Metadata } from 'next';
import { GearingCalculator } from '@/components/tools/gearing-calculator';
import { Clock } from 'lucide-react';

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

        {/* Practice Timer Link */}
        <div className="mb-12">
          <a
            href="/tools/timer"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-white/10 bg-[#111] p-6 transition-colors hover:border-yokomo-blue"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yokomo-blue/10">
                <Clock className="h-6 w-6 text-yokomo-blue" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-yokomo-blue">
                  Practice Timer
                </h2>
                <p className="text-sm text-gray-400">
                  5-10 minute timer with alarm for practice runs
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Gearing Calculator */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Gearing Calculator</h2>
          <p className="mb-6 text-gray-400">
            Calculate gear ratio, FDR, and motor RPM for your Yokomo SO with Hobbywing motors
          </p>
          <GearingCalculator />
        </div>
      </div>
    </div>
  );
}
