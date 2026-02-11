import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SO RC - Yokomo SO Resource',
    template: '%s | SO RC',
  },
  description:
    'Your comprehensive resource for Yokomo SO news, setups, and technical information',
  keywords: ['Yokomo', 'SO', 'RC', 'buggy', 'offroad', 'setups', 'racing'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SO RC',
    title: 'SO RC - Yokomo SO Resource',
    description:
      'Your comprehensive resource for Yokomo SO news, setups, and technical information',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SO RC - Yokomo SO Resource',
    description:
      'Your comprehensive resource for Yokomo SO news, setups, and technical information',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
