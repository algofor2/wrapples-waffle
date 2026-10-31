import type { Product } from './catalog';

export function buildOrderMessage(product: Product, quantity: number, selected: Record<string, string[]>, note: string) {
  const count = Math.min(30, Math.max(1, Math.trunc(quantity) || 1));
  const choices = product.choices.flatMap(group => {
    const values = group.values.filter(value => selected[group.key]?.includes(value)).slice(0, group.max);
    return values.length ? [`${group.label}: ${values.join(', ')}`] : [];
  });
  return [
    `Merhaba Wrapples Waffle, ${product.name} için sipariş vermek istiyorum.`,
    `Adet: ${count}`, ...choices,
    ...(note.trim() ? [`Not: ${note.trim().slice(0, 300)}`] : []),
    'Tercihlerin müsaitliğini ve teslim alma bilgisini paylaşabilir misiniz?',
  ].join('\n');
}
