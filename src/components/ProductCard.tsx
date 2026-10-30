'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Minus, Plus, X } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { buildOrderMessage } from '@/lib/orders';
import { ProductVisual } from './ProductVisual';

export function ProductCard({ product, index = 0, whatsappNumber }: { product: Product; index?: number; whatsappNumber: string | null }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const opener = trigger.current;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; opener?.focus({ preventScroll: true }); };
  }, [open]);
  const message = buildOrderMessage(product, quantity, selected, note);
  const href = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;
  const toggle = (key: string, value: string, max: number) => setSelected(previous => {
    const current = previous[key] || [];
    return { ...previous, [key]: current.includes(value) ? current.filter(x => x !== value) : current.length < max ? [...current, value] : current };
  });
  return <>
    <article className="product-card" data-reveal style={{ '--reveal-delay': `${index % 3 * 70}ms` } as React.CSSProperties}>
      <ProductVisual src={product.imageUrl} alt={product.imageAlt} label={product.name}/>
      <div className="product-card-body"><div className="card-topline"><span>{product.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{product.name}</h3><p>{product.description}</p><button ref={trigger} type="button" className="product-action" onClick={() => setOpen(true)}>ÜRÜNÜ İNCELE <ArrowUpRight size={19}/></button></div>
    </article>
    {open && createPortal(<dialog ref={dialog} className="product-modal" aria-labelledby={`title-${product.id}`} onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false); } }}>
      <button className="modal-close" onClick={() => setOpen(false)} aria-label="Kapat" autoFocus><X/></button>
      <ProductVisual src={product.imageUrl} alt={product.imageAlt} label={product.name} kind="hero"/>
      <div className="modal-content"><span className="eyebrow coral">{product.category}</span><h2 id={`title-${product.id}`}>{product.name}</h2><p>{product.description}</p>
        <div className="order-label" id={`quantity-${product.id}`}>Adet</div><div className="quantity-control" role="group" aria-labelledby={`quantity-${product.id}`}><button disabled={quantity === 1} onClick={() => setQuantity(x => Math.max(1, x - 1))} aria-label="Adedi azalt"><Minus size={18}/></button><output aria-live="polite">{quantity}</output><button disabled={quantity === 30} onClick={() => setQuantity(x => Math.min(30, x + 1))} aria-label="Adedi artır"><Plus size={18}/></button></div>
        {product.choices.map(group => <fieldset className="choice-group" key={group.key}><legend>{group.label} <small>En fazla {group.max}</small></legend><div className="choice-options">{group.values.map(value => <label key={value}><input type="checkbox" checked={selected[group.key]?.includes(value) || false} disabled={!selected[group.key]?.includes(value) && (selected[group.key]?.length || 0) >= group.max} onChange={() => toggle(group.key, value, group.max)}/><span>{value}</span></label>)}</div></fieldset>)}
        <label className="order-label" htmlFor={`note-${product.id}`}>Sipariş notu</label><textarea id={`note-${product.id}`} maxLength={300} value={note} onChange={e => setNote(e.target.value)} placeholder="Varsa tercihinizi yazın"/>
        <p className="order-hint">Tercihler müsaitliğe bağlıdır. WhatsApp&apos;ta mesajını kontrol edip gönder; sipariş işletme onayıyla kesinleşir.</p>{href ? <a className="button-primary order-send" href={href} target="_blank" rel="noreferrer">WHATSAPP&apos;TAN SİPARİŞ TALEBİ <ArrowUpRight size={18}/></a> : <p>Sipariş için iletişim sayfamızdaki telefon numarasını kullanabilirsiniz.</p>}
      </div>
    </dialog>, document.body)}
  </>;
}
