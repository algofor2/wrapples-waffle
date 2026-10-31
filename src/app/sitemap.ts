import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return base ? ['', '/menu', '/galeri', '/iletisim'].map(path => ({ url: `${base}${path}`, changeFrequency: path === '/menu' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .7 })) : [];
}
