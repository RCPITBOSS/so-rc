// lib/rate-limit.ts
import { headers } from 'next/headers';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (for production, use Redis or similar)
const store: RateLimitStore = {};

export interface RateLimitOptions {
  interval: number; // milliseconds
  uniqueTokenPerInterval: number; // max requests per interval
}

export async function rateLimit(options: RateLimitOptions): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'anonymous';
  
  const now = Date.now();
  const tokenCount = store[ip] || { count: 0, resetTime: now + options.interval };

  if (now > tokenCount.resetTime) {
    // Reset window
    tokenCount.count = 0;
    tokenCount.resetTime = now + options.interval;
  }

  tokenCount.count++;
  store[ip] = tokenCount;

  const success = tokenCount.count <= options.uniqueTokenPerInterval;

  return {
    success,
    limit: options.uniqueTokenPerInterval,
    remaining: Math.max(0, options.uniqueTokenPerInterval - tokenCount.count),
    reset: tokenCount.resetTime,
  };
}
