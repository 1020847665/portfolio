import { HeroSection } from '../components/HeroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { AboutTeaserSection } from '../components/home/AboutTeaserSection';
import { ContactSection } from '../components/home/ContactSection';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-home">
        <HeroSection />
        <FeaturedSection />
        <CategoriesSection />
        <AboutTeaserSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
