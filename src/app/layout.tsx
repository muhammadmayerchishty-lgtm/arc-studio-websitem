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
  metadataBase: new URL('https://arcstudio.pk'),
  title: 'Arc Studio — Spaces drawn with intent | DHA Lahore Architecture',
  description:
    'Arc Studio is an architectural and interior design atelier in DHA Lahore, Pakistan. Crafting timeless private estates, modern cantilevers, and bespoke residential sanctuaries.',
  keywords: [
    'Arc Studio',
    'Architecture DHA Lahore',
    'Architects Lahore',
    'Interior Design DHA Lahore',
    'Luxury Villas Pakistan',
    'Turnkey Architecture Lahore',
    'Bespoke Residential Atelier',
  ],
  authors: [{ name: 'Arc Studio' }],
  creator: 'Arc Studio',
  publisher: 'Arc Studio',
  openGraph: {
    title: 'Arc Studio — Spaces drawn with intent',
    description:
      'Private architectural and interior design atelier in DHA Lahore, crafting modern residential masterworks.',
    url: 'https://arcstudio.pk',
    siteName: 'Arc Studio',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/images/hero-villa.jpg',
        width: 1920,
        height: 1080,
        alt: 'Arc Studio Architectural Villa DHA Lahore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arc Studio — Architecture & Interior Design DHA Lahore',
    description:
      'Spaces drawn with intent. Architecture and interior design studio in DHA Lahore.',
    images: ['/images/hero-villa.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data: LocalBusiness (Architect)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Architect',
  '@id': 'https://arcstudio.pk/#organization',
  name: 'Arc Studio',
  alternateName: 'Arc Studio Architecture & Interior Design',
  url: 'https://arcstudio.pk',
  logo: 'https://arcstudio.pk/images/hero-villa.jpg',
  image: 'https://arcstudio.pk/images/hero-villa.jpg',
  description:
    'Spaces drawn with intent. Arc Studio is an architecture and interior design atelier crafting private residences and luxury estates in DHA Lahore.',
  telephone: '+92 370 4921265',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'DHA',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: '54792',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.4697,
    longitude: 74.3768,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://instagram.com/mayeroutreach_1',
    'https://wa.me/923704921265',
  ],
  priceRange: '$$$$',
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'DHA Lahore',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Gulberg Lahore',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Bahria Town Lahore',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
