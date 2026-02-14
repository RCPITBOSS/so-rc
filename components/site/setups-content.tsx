'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

interface Setup {
  driver: string;
  model: string;
  track: string;
  surface: string;
  date: string;
  file: string;
}

const surfaces = ['All', 'Indoor Dirt/Clay', 'Indoor Carpet', 'Outdoor Dirt', 'Turf'];

const setups: Setup[] = [
  {
    driver: 'Brian Dunbar',
    model: 'SO 2.0',
    track: 'Hoosier - Clash of Champions',
    surface: 'Indoor Dirt/Clay',
    date: '1/2024',
    file: '/setups/BrianDunbar.pdf',
  },
];

export function SetupsContent() {
  const [activeSurface, setActiveSurface] = useState<string>('All');

  const filtered =
    activeSurface === 'All' ? setups : setups.filter((s) => s.surface === activeSurface);

  return (
    <>
      {/* Surface tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {surfaces.map((surface) => (
          <button
            key={surface}
            onClick={() => setActiveSurface(surface)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSurface === surface
                ? 'bg-yokomo-blue text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {surface}
          </button>
        ))}
      </div>

      {/* Setup grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#111] py-20 text-center">
          <p className="text-gray-500">
            No setups available yet for this surface type. Have a setup to share?
          </p>
          <a
            href="/submit"
            className="mt-4 inline-block text-sm font-medium text-yokomo-blue hover:underline"
          >
            Submit a setup &rarr;
          </a>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((setup, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/20"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-semibold text-white">{setup.driver}</h3>
                <span className="text-sm text-yokomo-blue">{setup.model}</span>
              </div>
              <div className="mb-1 text-sm text-gray-400">{setup.track}</div>
              <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                <span className="rounded bg-white/10 px-2 py-0.5">{setup.surface}</span>
                <time>{setup.date}</time>
              </div>
              <a
                href={setup.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-yokomo-blue hover:underline"
              >
                <Download className="h-4 w-4" />
                View Setup Sheet
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
