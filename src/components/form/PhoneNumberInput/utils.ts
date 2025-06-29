export function getFlagEmoji(countryCode: string): string {
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
}
