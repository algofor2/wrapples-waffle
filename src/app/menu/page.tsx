import type { Metadata } from 'next';
import { getProducts, getSettings } from '@/lib/db';
import { MenuExplorer } from '@/components/MenuExplorer';
import { ScrollMotion } from '@/components/ScrollMotion';
export const metadata: Metadata = { title: 'Waffle Menüsü', description: 'Aydın Efeler Wrapples Waffle menüsü: klasik, kova, bardak, bowl ve özel seri waffle çeşitleri.' };
export const dynamic = 'force-dynamic';
export default async function MenuPage() { const [products, settings] = await Promise.all([getProducts(), getSettings()]); return <><ScrollMotion/><section className="page-hero menu-hero"><div className="section-shell"><span className="eyebrow">HER MODA BİR WAFFLE</span><h1>Lezzet<br/><em>haritası.</em></h1><p>Canın ne çekiyorsa, buradan başla.</p></div><span className="page-hero-symbol">✳</span></section><section className="section-shell menu-section" id="urunler"><div className="menu-intro" data-reveal><span>01 / WAFFLE MENÜSÜ</span><p>Ürünleri keşfet. Beğendiğin waffle için WhatsApp&apos;tan doğrudan sipariş talebi oluştur.</p></div><MenuExplorer products={products} whatsappNumber={settings.whatsappNumber}/></section></>; }
