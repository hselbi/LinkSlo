import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { URLInput } from './components/URLInput';
import { ShortenedURL } from './components/ShortenedURL';
import { shortenURL } from './utils/urlShortener';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async (url: string) => {
    setIsLoading(true);
    try {
      const shortened = await shortenURL(url);
      setShortenedURL(shortened);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortenedURL) {
      await navigator.clipboard.writeText(shortenedURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

        <div className="flex flex-col items-center space-y-6">
          <URLInput onShorten={handleShorten} isLoading={isLoading} />
          {shortenedURL && (
            <ShortenedURL
              url={shortenedURL}
              onCopy={handleCopy}
              isCopied={isCopied}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;