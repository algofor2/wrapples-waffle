import Image from 'next/image';

export function ProductVisual({ src, alt, kind = 'card', label = 'WRAPPLES' }: { src: string | null; alt: string | null; kind?: 'card' | 'hero'; label?: string }) {
  if (src && alt) return <div className={`product-visual ${kind}`}><Image src={src} alt={alt} fill sizes={kind === 'hero' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'} unoptimized/>{src.startsWith('/images/products/illustrative-') && <span className="illustrative-tag">TEMSİLİ GÖRSEL</span>}</div>;
  return <div className={`product-visual visual-pending ${kind}`} role="img" aria-label={`${label} için yayın izni doğrulanmış fotoğraf bekleniyor`}><span className="visual-orbit"/><span className="visual-monogram">W<span>✳</span></span><span className="visual-name">{label}</span><span className="visual-disclosure">GERÇEK FOTOĞRAF İÇİN YAYIN İZNİ BEKLENİYOR</span></div>;
}
