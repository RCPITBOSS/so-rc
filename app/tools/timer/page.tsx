import type { Metadata } from 'next';
import { PracticeTimer } from '@/components/tools/practice-timer';

export const metadata: Metadata = {
  title: 'Practice Timer',
  description: 'Practice run timer for RC racing',
};

export default function TimerPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
      <div className="container py-12">
        <PracticeTimer />
      </div>
    </div>
  );
}
