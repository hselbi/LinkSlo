import axios from 'axios';

interface BaseUrlRequest {
  url: string;
  password?: string;
  'max-clicks'?: number;
  'block-bots'?: boolean;
}

interface StandardUrlRequest extends BaseUrlRequest {
  alias?: string;
}

interface EmojiUrlRequest extends BaseUrlRequest {
  emojies?: string;
}

interface ApiResponse {
  short_url: string;
  message?: string;
}

const BASE_URL = 'https://spoo.me';

// Validation functions
const validatePassword = (password?: string): boolean => {
  if (!password) return true;

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (!/[a-zA-Z]/.test(password)) {
    throw new Error('Password must contain at least one letter');
  }

  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number');
  }

  if (!/[@.]/.test(password)) {
    throw new Error('Password must contain either @ or .');
  }

  if (/(.)\1/.test(password)) {
    throw new Error('Password cannot contain consecutive characters');
  }

  return true;
};

const validateUrl = (url: string): boolean => {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    new URL(url);
    return true;
  } catch {
    throw new Error('Invalid URL format. URL must include protocol (http/https)');
  }
};

const validateMaxClicks = (maxClicks?: number): boolean => {
  if (maxClicks === undefined) return true;
  if (!Number.isInteger(maxClicks) || maxClicks <= 0) {
    throw new Error('Max clicks must be a positive integer');
  }
  return true;
};

const validateAlias = (alias?: string): boolean => {
  if (!alias) return true;
  if (!/^[a-zA-Z0-9]{1,15}$/.test(alias)) {
    throw new Error('Alias must be alphanumeric and under 15 characters');
  }
  return true;
};

const validateEmojis = (emojis?: string): boolean => {
  if (!emojis) return true;
  // Emoji regex pattern
  const emojiPattern = /^[\p{Emoji}]+$/u;
  if (!emojiPattern.test(emojis)) {
    throw new Error('Emoji sequence must contain only emojis');
  }
  return true;
};

// API functions
export async function shortenUrl(url: string, options?: {
  alias?: string;
  password?: string;
  maxClicks?: number;
  blockBots?: boolean;
}): Promise<string> {
  validateUrl(url);
  validatePassword(options?.password);
  validateMaxClicks(options?.maxClicks);
  validateAlias(options?.alias);

  const data: StandardUrlRequest = {
    url,
    ...(options?.alias && { alias: options.alias }),
    ...(options?.password && { password: options.password }),
    ...(options?.maxClicks && { 'max-clicks': options.maxClicks }),
    ...(options?.blockBots && { 'block-bots': options.blockBots })
  };

  try {
    const response = await axios.post<ApiResponse>(BASE_URL, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.short_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to shorten URL');
    }
    throw error;
  }
}

export async function shortenUrlWithEmojis(url: string, options?: {
  emojies?: string;
  password?: string;
  maxClicks?: number;
  blockBots?: boolean;
}): Promise<string> {
  validateUrl(url);
  validatePassword(options?.password);
  validateMaxClicks(options?.maxClicks);
  validateEmojis(options?.emojies);

  const data: EmojiUrlRequest = {
    url,
    ...(options?.emojies && { emojies: options.emojies }),
    ...(options?.password && { password: options.password }),
    ...(options?.maxClicks && { 'max-clicks': options.maxClicks }),
    ...(options?.blockBots && { 'block-bots': options.blockBots })
  };

  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/emoji/`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.short_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to shorten URL');
    }
    throw error;
  }
}

// Predefined emoji pairs for use in the UI
export const EMOJI_PAIRS = [
  { label: "Snake", value: "🐍🐍" },
  { label: "Star", value: "⭐⭐" },
  { label: "Heart", value: "❤️❤️" },
  { label: "Rocket", value: "🚀🚀" },
  { label: "Lightning", value: "⚡⚡" },
  { label: "Fire", value: "🔥🔥" },
  { label: "Rainbow", value: "🌈🌈" },
  { label: "Sparkles", value: "✨✨" },
  { label: "Crown", value: "👑👑" },
  { label: "Magic", value: "🎭🎭" }
];