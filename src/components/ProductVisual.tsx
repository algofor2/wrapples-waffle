import Image from 'next/image';

export function isIllustrative(src: string | null) { return !!src && (src.startsWith('/images/premium/') || src.startsWith('/images/products/illustrative-')); }
export function ProductVisual({ src, alt, kind = 'card', label = 'WRAPPLES' }: { src: string | null; alt: string | null; kind?: 'card' | 'hero'; label?: string }) {
  if (src && alt) return <div className={`product-visual ${kind}`}><Image src={src} alt={alt} fill sizes={kind === 'hero' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'} unoptimized={!src.startsWith('/')}/>{isIllustrative(src) && <span className="illustrative-tag">Temsili sunum</span>}</div>;
  return <div className={`product-visual visual-pending ${kind}`} role="img" aria-label={`${label} için fotoğraf hazırlanıyor`}><span className="visual-orbit"/><span className="visual-monogram">W<span>✳</span></span><span className="visual-name">{label}</span><span className="visual-disclosure">FOTOĞRAF HAZIRLANIYOR</span></div>;
}
