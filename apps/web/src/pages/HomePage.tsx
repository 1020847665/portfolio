import { HeroSection } from '../components/HeroSection';
import {
  FeaturedSection,
  CategoriesSection,
  AboutTeaserSection,
  ContactSection,
  Navbar,
  Footer,
} from '@portfolio/ui';

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
