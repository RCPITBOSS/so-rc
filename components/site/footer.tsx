import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="container flex flex-col items-center gap-3 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-gray-500">&copy; 2026 Super Offroad RC</p>
        <nav className="flex gap-4">
          <Link href="/about" className="text-sm text-gray-500 transition-colors hover:text-white hover:underline">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
