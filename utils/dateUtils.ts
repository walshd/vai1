export function parseYear(dateString: string | null): number | null {
  if (!dateString) return null;

  const yearMatch = dateString.match(/\b(\d{4})\b/);
  if (yearMatch) {
    return parseInt(yearMatch[1]);
  }

  return null;
}

