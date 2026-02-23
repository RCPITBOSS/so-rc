'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import { signOut } from '@/app/auth/actions';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/setups', label: 'Setups' },
  { href: '/tracks', label: 'Tracks' },
  { href: '/tools', label: 'Tools' },
  { href: '/tips', label: 'Tips' },
  { href: '/manuals', label: 'Manuals' },
  { href: '/submit', label: 'Submit' },
  { href: '/about', label: 'About' },
];

export function Header({ user }: { user: User | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-yokomo-blue bg-yokomo-blue/10">
            <span className="text-sm font-bold text-yokomo-blue">SO</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            SO <span className="text-yokomo-blue">RC</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-yokomo-blue'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0A0A0A] md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-yokomo-blue/10 text-yokomo-blue'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
