import type { Metadata } from 'next';
import './globals.css';
import './fonts.css';
import './premium.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { getSettings } from '@/lib/storefront';
import { getSiteUrl } from '@/lib/site-url';
const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: 'Wrapples Waffle | Aydın Efeler Waffle', template: '%s | Wrapples Waffle' },
  description: 'Aydın Efeler Güzelhisar’da Wrapples Waffle. 11 waffle çeşidini keşfet, çikolata ve meyve tercihlerini seç, WhatsApp’tan sipariş talebi gönder.',
  openGraph: { title: 'Wrapples Waffle | Aydın Efeler', description: 'Klasik, kova, bardak ve bowl waffle. Güzelhisar’da tatlı bir mola.', locale: 'tr_TR', type: 'website', siteName: 'Wrapples Waffle', ...(siteUrl ? { url: siteUrl } : {}) },
  twitter: { card: 'summary_large_image', title: 'Wrapples Waffle | Aydın Efeler', description: 'Bir waffle, güzel bir bahane. Güzelhisar’da tatlı bir mola.' },
  robots: { index: true, follow: true },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const business = { '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop', name: 'Wrapples Waffle', telephone: settings.phone, ...(siteUrl ? { url: siteUrl, hasMenu: `${siteUrl}/menu` } : {}), address: { '@type': 'PostalAddress', streetAddress: settings.address, addressLocality: 'Efeler', addressRegion: 'Aydın', addressCountry: 'TR' }, servesCuisine: 'Waffle' };
  return <html lang="tr"><body><a href="#main-content" className="skip-link">İçeriğe geç</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }}/><SiteHeader whatsappNumber={settings.whatsappNumber}/><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter whatsappNumber={settings.whatsappNumber}/></body></html>;
}
