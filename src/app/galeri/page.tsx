import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import { ProductVisual } from '@/components/ProductVisual';
import { ScrollMotion } from '@/components/ScrollMotion';
export const metadata: Metadata = { title: 'Galeri' };
export const dynamic = 'force-dynamic';
export default async function GalleryPage() { const products = await getProducts(); const photos = products.filter(p => p.imageUrl && p.imageAlt && !p.imageUrl.startsWith('/images/products/illustrative-')); return <><ScrollMotion/><section className="page-hero gallery-hero"><div className="section-shell"><span className="eyebrow">KARE KARE WRAPPLES</span><h1>Bizim<br/><em>galerimiz.</em></h1><p>Wrapples&apos;ın gerçek kareleri burada.</p></div></section><section className="section-shell gallery-section">{photos.length ? <div className="gallery-grid">{photos.map(p => <figure key={p.id} data-reveal><ProductVisual src={p.imageUrl} alt={p.imageAlt} label={p.name}/><figcaption>{p.name}</figcaption></figure>)}</div> : <div className="gallery-empty" data-reveal><span className="eyebrow coral">GALERİ / YAKINDA</span><div className="gallery-empty-art">W<span>✳</span></div><h2>Gerçek anlar,<br/><em>gerçek kareler.</em></h2><p>İşletmeye ait fotoğrafların web yayın izni doğrulandığında bu alanı dolduracağız.</p></div>}</section></>; }
