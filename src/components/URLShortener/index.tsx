'use client';

import { useState } from 'react';
import { URLInput } from './URLInput';
import { ShortenedURL } from './ShortenedURL';
import { shortenURL } from '@/lib/actions';

export function URLShortener() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShortenedURL(null);

    try {
      const shortened = await shortenURL(url);
      setShortenedURL(shortened);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortenedURL) {
      try {
        await navigator.clipboard.writeText(shortenedURL);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        setError('Failed to copy to clipboard');
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <URLInput
        url={url}
        onUrlChange={setUrl}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">
          {error}
        </p>
      )}
      {shortenedURL && (
        <ShortenedURL
          url={shortenedURL}
          onCopy={handleCopy}
          isCopied={isCopied}
        />
      )}
    </div>
  );
}