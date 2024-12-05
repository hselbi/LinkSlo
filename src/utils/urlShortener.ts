// src/lib/urlShortener.ts

/**
 * Configuration interface for Bitly API
 */
interface BitlyConfig {
  apiKey: string;
  groupGuid?: string;
  domain?: string;
}

/**
 * Bitly API response interface
 */
interface BitlyResponse {
  link: string;
  id: string;
  long_url: string;
  created_at: string;
}

/**
 * Error class for URL shortening failures
 */
class URLShortenerError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'URLShortenerError';
  }
}

/**
 * URL Shortener service using Bitly API
 */
export class URLShortenerService {
  private readonly apiKey: string;
  private readonly groupGuid?: string;
  private readonly domain?: string;
  private readonly apiEndpoint = 'https://api-ssl.bitly.com/v4/shorten';

  constructor(config: BitlyConfig) {
    this.apiKey = config.apiKey;
    this.groupGuid = config.groupGuid;
    this.domain = config.domain;

    if (!this.apiKey) {
      throw new Error('Bitly API key is required');
    }
  }

  /**
   * Shortens a given URL using Bitly API
   * @param url - The long URL to shorten
   * @returns Promise with the shortened URL
   * @throws URLShortenerError if the operation fails
   */
  async shortenURL(url: string): Promise<string> {
    try {
      // Validate URL
      if (!this.isValidURL(url)) {
        throw new URLShortenerError('Invalid URL provided');
      }

      // Prepare request body
      const requestBody: Record<string, string> = {
        long_url: url,
      };

      if (this.domain) requestBody.domain = this.domain;
      if (this.groupGuid) requestBody.group_guid = this.groupGuid;
      console.log('Shortening URL:', url);
      console.log('BITLY_API_KEY:', this.apiKey);
      console.log('BITLY_GROUP_GUID:', this.groupGuid);

      // Make API request
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new URLShortenerError(
          errorData.message || 'Failed to shorten URL',
          response.status
        );
      }

      const data = await response.json() as BitlyResponse;
      return data.link;

    } catch (error) {
      if (error instanceof URLShortenerError) {
        throw error;
      }
      throw new URLShortenerError(
        `Failed to shorten URL: ${(error as Error).message}`
      );
    }
  }

  /**
   * Validates a URL string
   * @param url - URL to validate
   * @returns boolean indicating if URL is valid
   */
  private isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Creates a singleton instance of the URL shortener service
 */
export const createURLShortener = (() => {
  let instance: URLShortenerService | null = null;

  return (config: BitlyConfig): URLShortenerService => {
    if (!instance) {
      instance = new URLShortenerService(config);
    }
    return instance;
  };
})();

/**
 * Convenience function for shortening URLs
 * @param url - The URL to shorten
 * @returns Promise with the shortened URL
 */
export async function shortenURL(url: string): Promise<string> {
  if (!process.env.BITLY_API_KEY) {
    throw new Error('BITLY_API_KEY environment variable is not set');
  }
  console.log('Shortening URL:', url);
  console.log('BITLY_API_KEY:', process.env.BITLY_API_KEY);
  console.log('BITLY_GROUP_GUID:', process.env.BITLY_GROUP_GUID);
  console.log('BITLY_DOMAIN:', process.env.BITLY_DOMAIN);
  const shortener = createURLShortener({
    apiKey: process.env.BITLY_API_KEY,
    groupGuid: process.env.BITLY_GROUP_GUID,
    domain: process.env.BITLY_DOMAIN,
  });

  console.log('Shortening URL:', url);

  return shortener.shortenURL(url);
}