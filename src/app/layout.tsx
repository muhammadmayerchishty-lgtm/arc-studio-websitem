import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { SectionProgress } from '@/components/layout/SectionProgress';
import { CustomCursor } from '@/components/layout/CustomCursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arc Studio — Spaces drawn with intent | DHA Lahore',
  description:
    'Arc Studio is an architectural and interior design atelier in DHA, Lahore, Pakistan. Spaces drawn with intent.',
  keywords: [
    'Arc Studio',
    'Architecture Lahore',
    'Interior Design DHA Lahore',
    'Luxury Architecture Pakistan',
    'Bespoke Interiors',
  ],
  authors: [{ name: 'Arc Studio' }],
  openGraph: {
    title: 'Arc Studio — Spaces drawn with intent',
    description: 'Architecture & Interior Design Atelier in DHA Lahore.',
    siteName: 'Arc Studio',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-body bg-basalt text-bone selection:bg-brass/30 selection:text-bone min-h-screen relative">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <SectionProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
