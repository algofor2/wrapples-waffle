export function getSiteUrl(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : undefined;
  } catch { return undefined; }
}
export function canonicalMetadata(path: string) {
  const base = getSiteUrl();
  return base ? { alternates: { canonical: `${base}${path}` } } : {};
}
