import { canonicalMetadata } from '@/lib/site-url';
import type { Metadata } from 'next';
import { ProductVisual } from '@/components/ProductVisual';
import { ScrollMotion } from '@/components/ScrollMotion';
export const metadata: Metadata = { ...canonicalMetadata('/galeri'), title: 'Gerçek Ürün Fotoğrafları', description: 'Wrapples Waffle Aydın Efeler menüsündeki gerçek ürün fotoğrafları. Temsili sunum görsellerinden ayrı kaynak galerisi.' };
const photos = [
  ['klasik-waffle', 'Klasik Waffle'], ['bowl-waffle', 'Bowl Waffle'], ['bardak-waffle', 'Bardak Waffle'],
  ['kova-waffle', 'Kova Waffle'], ['super-kova-waffle', 'Süper Kova Waffle'], ['fistik-bombasi-special-bardak-waffle', 'Fıstık Bombası Special Bardak Waffle'],
];
export default function GalleryPage() {
  return <><ScrollMotion/><section className="page-hero gallery-hero"><div className="section-shell"><span className="eyebrow">KARE KARE WRAPPLES</span><h1>Lezzetin<br/><em>gerçek hâli.</em></h1><p>Menümüzden altı gerçek ürün fotoğrafı.</p></div></section><section className="section-shell gallery-section"><p className="gallery-real-note" data-reveal>Buradaki kareler işletmenin Migros Yemek menüsündeki kaynak fotoğraflarıdır. Sitedeki “Temsili sunum” etiketli yaratıcı görsellerden ayrıdır. Sunum ve meyveler müsaitliğe göre değişebilir.</p><div className="gallery-grid">{photos.map(([id, name]) => <figure key={id} data-reveal="image"><ProductVisual src={`/images/products/${id}.webp`} alt={`Wrapples Waffle Migros Yemek menüsünden gerçek ${name} fotoğrafı`} label={name}/><figcaption>{name}</figcaption></figure>)}</div></section></>;
}
