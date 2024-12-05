// src/lib/actions.ts
'use server';

import { URLShortenerService } from '@/utils/urlShortener';
import { z } from 'zod';

const urlSchema = z.string().url();

export async function shortenURL(url: string): Promise<string> {
  try {
    // First validate the URL
    const parsedUrl = urlSchema.parse(url);

    // Check for environment variables
    const apiKey = process.env.BITLY_API_KEY;
    if (!apiKey) {
      throw new Error('BITLY_API_KEY environment variable is not set');
    }

    console.log('Shortening URL:', parsedUrl);

    // Create shortener service instance
    const shortener = new URLShortenerService({
      apiKey,
    });

    
    // Shorten the URL
    const shortUrl = await shortener.shortenURL(parsedUrl);
    console.log('Shortening URL:', shortUrl);
    return shortUrl;

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Please enter a valid URL');
    }
    if (error instanceof Error) {
      // Pass through any specific error messages from the URL shortener
      throw new Error(error.message);
    }
    throw new Error('Failed to shorten URL');
  }
}