import { Hero } from '@/components/hero';
import { UrlShortener } from '@/components/url-shortener';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <Hero />
        <UrlShortener />
        <Features />
        <Footer />
      </div>
    </main>
  );
}