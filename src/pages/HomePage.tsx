import { AboutSection } from '../components/home/AboutSection';
import { FAQSection } from '../components/home/FAQSection';
import { Footer } from '../components/home/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { PrizesSection } from '../components/home/PrizesSection';
import { RoundsSection } from '../components/home/RoundsSection';
import { GallerySection } from '../components/home/GallerySection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <RoundsSection />
      <PrizesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
