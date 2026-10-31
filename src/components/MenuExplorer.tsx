'use client';
import { useState } from 'react';
import { categories, type Product } from '@/lib/catalog';
import { ProductCard } from './ProductCard';
export function MenuExplorer({ products, whatsappNumber, initialCategory = 'Tümü' }: { initialCategory?: string; products: Product[]; whatsappNumber: string | null }) {
  const [category, setCategory] = useState(['Tümü', ...categories].includes(initialCategory) ? initialCategory : 'Tümü');
  const filtered = products.filter(p => p.available && (category === 'Tümü' || p.category === category));
  return <><div className="category-tabs" role="group" aria-label="Menü kategorileri">{['Tümü', ...categories].map(x => <button type="button" key={x} className={category === x ? 'active' : ''} aria-pressed={category === x} onClick={() => setCategory(x)}>{x}</button>)}</div><p className="category-summary" role="status">{category === 'Tümü' ? 'Tüm waffle çeşitleri' : category} <span>{filtered.length} ürün</span></p><div className="product-grid">{filtered.map((p, i) => <ProductCard product={p} index={i} key={p.id} whatsappNumber={whatsappNumber}/>)}</div></>;
}
