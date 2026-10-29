'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Minus, Plus, X } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { ProductVisual } from './ProductVisual';

export function ProductCard({ product, index = 0, whatsappNumber }: { product: Product; index?: number; whatsappNumber: string | null }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  useEffect(() => { if (!open) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', escape); return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', escape); }; }, [open]);
  const message = `Merhaba Wrapples Waffle, ${product.name} için sipariş vermek istiyorum.\nAdet: ${quantity}${note.trim() ? `\nNot: ${note.trim()}` : ''}\nMüsaitlik ve teslim alma bilgisini paylaşabilir misiniz?`;
  const href = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;
  return <>
    <article className="product-card" data-reveal style={{ '--reveal-delay': `${Math.min(index % 4, 3) * 80}ms` } as React.CSSProperties}>
      <ProductVisual src={product.imageUrl} alt={product.imageAlt} label={product.name}/>
      <div className="product-card-body"><div className="card-topline"><span>{product.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{product.name}</h3><p>{product.description}</p><button type="button" className="product-action" onClick={() => setOpen(true)}>ÜRÜNÜ İNCELE <ArrowUpRight size={19}/></button></div>
    </article>
    {open && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}><section className="product-modal" role="dialog" aria-modal="true" aria-label={`${product.name} sipariş talebi`}><button className="modal-close" onClick={() => setOpen(false)} aria-label="Kapat"><X/></button><ProductVisual src={product.imageUrl} alt={product.imageAlt} label={product.name} kind="hero"/><div className="modal-content"><span className="eyebrow">WRAPPLES WAFFLE / {product.category}</span><h2>{product.name}</h2><p>{product.description}</p><label className="order-label">Adet</label><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Adedi azalt"><Minus size={18}/></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(30, quantity + 1))} aria-label="Adedi artır"><Plus size={18}/></button></div><label className="order-label" htmlFor={`note-${product.id}`}>Sipariş notu</label><textarea id={`note-${product.id}`} maxLength={300} value={note} onChange={e => setNote(e.target.value)} placeholder="Varsa tercihinizi yazın"/><p className="order-hint">WhatsApp açıldığında hazırlanan mesajı kontrol edip gönderin. Sipariş işletme onayıyla kesinleşir.</p>{href && <a className="button-primary order-send" href={href} target="_blank" rel="noreferrer">WHATSAPP&apos;TAN SİPARİŞ TALEBİ <ArrowUpRight size={18}/></a>}</div></section></div>}
  </>;
}
