/**
 * Get flag image URL from country code
 * @param countryCode - Two-letter country code
 * @returns URL to country flag image
 */
export function getFlagEmoji(countryCode: string): string {
  // Instead of using emoji, return an image URL from flagcdn.com
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
}
