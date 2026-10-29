import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://wrapples.example'; return ['', '/menu', '/galeri', '/iletisim'].map(path => ({ url: `${base}${path}`, changeFrequency: path === '/menu' ? 'weekly' : 'monthly', priority: path === '' ? 1 : .7 })); }
