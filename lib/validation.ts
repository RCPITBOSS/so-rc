// lib/validation.ts
import { z } from 'zod';

// Track submission schema
export const trackSubmissionSchema = z.object({
  name: z.string().min(1, 'Track name is required').max(100),
  location: z.string().min(1, 'Location is required').max(100),
  surface: z.enum(['Indoor Dirt/Clay', 'Indoor Carpet', 'Outdoor Dirt', 'Turf']),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  email: z.string().email('Must be a valid email'),
  honeypot: z.string().optional(), // Should be empty
});

export type TrackSubmission = z.infer<typeof trackSubmissionSchema>;

// Setup submission schema
export const setupSubmissionSchema = z.object({
  driver: z.string().min(1, 'Driver name is required').max(100),
  track: z.string().min(1, 'Track name is required').max(100),
  surface: z.enum(['Indoor Dirt/Clay', 'Indoor Carpet', 'Outdoor Dirt', 'Turf']),
  notes: z.string().max(500).optional(),
  email: z.string().email('Must be a valid email'),
  honeypot: z.string().optional(), // Should be empty
});

export type SetupSubmission = z.infer<typeof setupSubmissionSchema>;
