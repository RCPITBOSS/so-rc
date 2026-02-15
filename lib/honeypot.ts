// lib/honeypot.ts

/**
 * Check if the honeypot field was filled (indicates bot)
 * Honeypot fields should be hidden from users but visible to bots
 */
export function isBot(honeypotValue: string | null | undefined): boolean {
  // If honeypot has any value, it's a bot
  return Boolean(honeypotValue && honeypotValue.trim().length > 0);
}

/**
 * Get honeypot field props for forms
 * This creates a field that's:
 * - Visually hidden but accessible to screen readers
 * - Named something tempting to bots
 * - Has autocomplete disabled
 */
export const honeypotProps = {
  name: 'website', // Common name bots look for
  type: 'text',
  autoComplete: 'off',
  tabIndex: -1,
  'aria-hidden': 'true',
  style: {
    position: 'absolute' as const,
    left: '-9999px',
    width: '1px',
    height: '1px',
    opacity: 0,
    pointerEvents: 'none' as const,
  },
};
