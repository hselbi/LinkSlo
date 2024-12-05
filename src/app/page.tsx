import { URLShortener } from '@/components/URLShortener';
import { Link } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Link className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            URL Shortener
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplify your links with our URL shortener. Perfect for sharing on
            social media, messages, or anywhere you need a concise link.
          </p>
        </div>
        <URLShortener />
      </div>
    </main>
  );
}