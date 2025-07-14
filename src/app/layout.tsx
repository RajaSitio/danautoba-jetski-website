
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackToTopButton } from '@/components/common/back-to-top-button';
import { PromoFAB } from '@/components/common/promo-fab';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], variable: '--font-exo2' });

const siteUrl = 'https://danautobajetski.com';
const logoUrl = "https://archive.org/download/logo-baru-jetski-danau-toba-samosir/logo%20baru%20jetski%20danau%20toba%20samosir.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), 
  title: {
    default: 'Danau Toba Jetski: Paket, Galeri, Promo & Rekomendasi Cerdas | Sewa Jetski Terbaik di Danau Toba',
    template: '%s | Danau Toba Jetski',
  },
  description: 'Danau Toba Jetski: Pilihan utama untuk sewa jetski Danau Toba! Temukan paket terbaik, promo menarik, galeri foto & video, info lokasi, FAQ, dan dapatkan rekomendasi cerdas. Peralatan modern, dokumentasi profesional untuk tur Batu Gantung & Situmurun.',
  keywords: [
    'jetski danau toba', 
    'sewa jetski danau toba', 
    'paket jetski danau toba',
    'harga jetski danau toba',
    'rental jetski danau toba', 
    'jetski parapat',
    'jetski samosir',
    'wisata jetski samosir',
    'promo jetski danau toba',
    'faq jetski danau toba',
    'tips aman naik jetski di danau toba',
    'jetski situmurun',
    'jetski batu gantung',
    'tur jetski samosir',
    'sewa jetski samosir', 
    'rental jetski samosir', 
    'jetski tuktuk', 
    'petualangan air danau toba',
    'watersport samosir',
    'paket wisata danau toba jetski',
    'rekomendasi jetski danau toba',
    'asisten jetski danau toba',
    'chatbot danau toba jetski',
    'sewa jetski danau toba murah',
    'harga paket jetski danau toba',
    'pengalaman main jetski parapat',
    'aquabike jetski world championship danau toba',
    'event jetski dunia Danau Toba',
    'danautobajetski.com',
  ],
  authors: [{ name: 'Danau Toba Jetski', url: siteUrl }],
  creator: 'Danau Toba Jetski Team & Firebase Studio AI',
  publisher: 'Danau Toba Jetski',
  alternates: {
    canonical: '/', 
  },
  robots: { 
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Danau Toba Jetski: Paket Terbaik, Galeri, Promo & Tur Jetski di Danau Toba',
    description: 'Danau Toba Jetski menawarkan sewa jetski dan paket tur terbaik di Danau Toba. Jelajahi Batu Gantung & Situmurun. Peralatan modern, dokumentasi pro, promo terbaru. Pesan petualanganmu!',
    url: siteUrl, 
    siteName: 'Danau Toba Jetski',
    images: [
      {
        url: logoUrl,
        width: 800,
        height: 600,
        alt: 'Logo Danau Toba Jetski',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danau Toba Jetski: Paket, Promo & Tur Jetski Keren di Danau Toba! #DanauTobaJetski',
    description: 'Cari Danau Toba Jetski? Paket jetski, promo, galeri aksi, rekomendasi cerdas, tur Batu Gantung & Situmurun. Peralatan modern, dokumentasi pro. Pesan sekarang! #DanauToba #Jetski',
    images: [logoUrl], 
  },
  verification: { 
    google: '8FN5WQ-I8GEPSVIyg2CSzsm9AEEQwB_2fwJsUYS5MMw', 
  },
  category: 'tourism',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(var(--background))' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(var(--background))' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Danau Toba Jetski",
  "alternateName": ["Danau Toba Jetski", "DanauTobaJetski"],
  "url": siteUrl,
  "logo": logoUrl,
  "sameAs": [
    "https://web.facebook.com/profile.php?id=61576861521610&locale=id_ID",
    "https://www.instagram.com/tuktukjetski?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "https://www.tiktok.com/@tuktukjetskiofficial2",
    "https://www.youtube.com/channel/UC05XMeIK8hpQ_2nQsC-avfg"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-895-6110-16833", 
    "contactType": "Customer Service"
  },
  "address": { 
    "@type": "PostalAddress",
    "streetAddress": "Jl. Gereja, Tuktuk Siadong, Simanindo",
    "addressLocality": "Samosir",
    "addressRegion": "Sumatera Utara",
    "addressCountry": "ID"
  }
};

const tourismBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TourismBusiness",
  "name": "Danau Toba Jetski",
  "description": metadata.description,
  "image": logoUrl,
  "url": siteUrl,
  "telephone": "+62-895-6110-16833", 
  "priceRange": "Rp 900.000 - Rp 4.000.000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Gereja, Tuktuk Siadong, Simanindo", 
    "addressLocality": "Samosir",
    "addressRegion": "Sumatera Utara",
    "addressCountry": "ID"
  },
  "geo": { 
    "@type": "GeoCoordinates",
    "latitude": "2.671542",
    "longitude": "98.865743"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Paket Jetski Danau Toba",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SeaDoo Jetski 30 Menit" }, "url": `${siteUrl}/paket/seadoo-30-min` },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SeaDoo Jetski 1 Jam" }, "url": `${siteUrl}/paket/seadoo-1-hr` },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SeaDoo Jetski 1 Jam Batu Gantung" }, "url": `${siteUrl}/paket/seadoo-1-hr-batu-gantung` },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SeaDoo Jetski 2 Jam 15 Menit Air Terjun Situmurun" }, "url": `${siteUrl}/paket/seadoo-2-hr-15-min-situmurun` }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${exo2.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourismBusinessSchema) }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <BackToTopButton />
          <PromoFAB />
        </LanguageProvider>
      </body>
    </html>
  );
}
