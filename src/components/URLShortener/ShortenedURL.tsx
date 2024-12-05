'use client';

import { Copy, CheckCircle2 } from 'lucide-react';

interface ShortenedURLProps {
  url: string;
  onCopy: () => void;
  isCopied: boolean;
}

export function ShortenedURL({ url, onCopy, isCopied }: ShortenedURLProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 truncate">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {url}
          </a>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
        >
          {isCopied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}