// shortened-url-display.tsx
'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ShortenedUrlDisplayProps {
  url: string;
}

export function ShortenedUrlDisplay({ url }: ShortenedUrlDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <motion.div 
      className="p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Your shortened URL:</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <code className="flex-1 w-full p-4 bg-white dark:bg-gray-900 rounded-lg font-mono text-sm text-purple-600 dark:text-purple-400 break-all">
          {url}
        </code>
        <Button 
          variant="outline"
          onClick={handleCopy}
          className="w-full sm:w-auto group hover:border-purple-500 hover:text-purple-500 transition-all duration-300"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 group-hover:text-purple-500" />
              Copy
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}