import type { Metadata } from 'next';
import { SubmitForms } from '@/components/site/submit-forms';

export const metadata: Metadata = {
  title: 'Submit Content',
  description: 'Submit setups and tracks to SO RC',
};

export default function SubmitPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Submit Content
          </h1>
          <p className="mt-2 text-gray-400">
            Help build the SO RC community by sharing setups and tracks.
          </p>
        </div>

        <SubmitForms />
      </div>
    </div>
  );
}
