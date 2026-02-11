import type { Metadata } from 'next';
import { Download, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources & Documentation',
  description: 'Yokomo SO manuals, setup sheets, and technical documentation',
};

interface ManualItem {
  title: string;
  description: string;
  file?: string;
  comingSoon?: boolean;
}

const manuals: ManualItem[] = [
  {
    title: 'SO 3.0 Manual',
    description: 'Complete build and reference manual for the Yokomo SO 3.0',
    comingSoon: true,
  },
  {
    title: 'SO 2.0 Manual',
    description: 'Complete build and reference manual for the Yokomo SO 2.0',
    comingSoon: true,
  },
  {
    title: 'Blank Setup Sheet',
    description: 'Printable blank setup sheet for documenting your SO settings',
    file: '/manuals/blank-setup-sheet.pdf',
  },
];

export default function ManualsPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Resources &amp; Documentation
          </h1>
          <p className="mt-2 text-gray-400">Manuals, setup sheets, and technical documents.</p>
        </div>

        <div className="space-y-4">
          {manuals.map((manual) => (
            <div
              key={manual.title}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{manual.title}</h3>
                  <p className="text-sm text-gray-400">{manual.description}</p>
                </div>
              </div>
              {manual.comingSoon ? (
                <span className="whitespace-nowrap rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-500">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={manual.file}
                  download
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-yokomo-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yokomo-blue/90"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
