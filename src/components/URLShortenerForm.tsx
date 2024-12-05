'use client';

import { useState } from 'react';
import { Link2 } from 'lucide-react';
import { ShortenedURL } from './ShortenedURL';
import { shortenURL } from '@/lib/actions';

export function URLShortenerForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setIsLoading(true);
      setError(null);
      try {
        const shortened = await shortenURL(url);
        setShortenedURL(shortened);
      } catch (error) {
        setError('Failed to shorten URL. Please try again.');
        console.error('Error shortening URL:', error);
      } finally {
        setIsLoading(false);
      }
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
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>

      {shortenedURL && (
        <ShortenedURL
          url={shortenedURL}
          onCopy={handleCopy}
          isCopied={isCopied}
        />
      )}
    </>
  );
}