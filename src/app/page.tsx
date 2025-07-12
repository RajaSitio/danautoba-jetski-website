
import { VideoGallerySection } from "@/components/sections/video-gallery-section";
import type { Metadata } from 'next';
import { PhotoGallerySection } from "@/components/sections/photo-gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PackagesSection } from "@/components/sections/packages-section";
import { FindUsSection } from "@/components/sections/find-us-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { packageData } from '@/data/packages';
import { OtherActivitiesSection } from "@/components/sections/other-activities-section";

export const metadata: Metadata = {
  title: 'Danau Toba Jetski: Sewa Jetski & Paket Tur Terbaik di Danau Toba | Batu Gantung & Situmurun',
  description: 'Danau Toba Jetski menawarkan pengalaman sewa jetski terbaik di Danau Toba dan paket tur eksklusif ke Batu Gantung & Air Terjun Situmurun. Peralatan modern, dokumentasi profesional. Pesan petualangan air Kamu sekarang bersama DanauTobaJetski.com!',
  keywords: [
    'danau toba jetski terbaik',
    'sewa jetski danau tooba samosir',
    'paket jetski danau toba',
    'tur jetski batu gantung',
    'tur jetski air terjun situmurun',
    'petualangan jetski danau toba',
    'danau toba watersport',
    'harga sewa jetski danau toba',
  ],
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoGallerySection />
      <PhotoGallerySection />
      <PackagesSection packageDataWithAiImages={packageData} />
      <OtherActivitiesSection />
      <FindUsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </>
  );
}
