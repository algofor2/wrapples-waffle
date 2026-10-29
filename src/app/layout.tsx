import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: { default: 'Wrapples Waffle | Aydın Efeler Waffle', template: '%s | Wrapples Waffle' },
  description: 'Aydın Efeler Güzelhisar’daki Wrapples Waffle lezzetlerini keşfedin. Klasik, kova, bardak ve bowl waffle çeşitlerini inceleyin.',
  openGraph: { title: 'Wrapples Waffle', description: 'Aydın Efeler’de waffle keyfi.', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const business = { '@context': 'https://schema.org', '@type': 'FoodEstablishment', name: 'Wrapples Waffle', address: { '@type': 'PostalAddress', streetAddress: 'Adnan Menderes Blv. 39 B', addressLocality: 'Efeler', addressRegion: 'Aydın', addressCountry: 'TR' }, servesCuisine: 'Waffle' };
  return <html lang="tr"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}/><SiteHeader whatsappNumber={settings.whatsappNumber}/><main id="main-content">{children}</main><SiteFooter whatsappNumber={settings.whatsappNumber}/></body></html>;
}
