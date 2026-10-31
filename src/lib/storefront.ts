import { defaultSettings, seedProducts, type Product, type PublicSettings } from './catalog';

// Simple public storefront: no database, login or admin dashboard.
export async function getProducts(): Promise<Product[]> {
  return seedProducts;
}
export async function getSettings(): Promise<PublicSettings> {
  const configured = (process.env.WHATSAPP_ORDER_NUMBER || defaultSettings.whatsappNumber || '').replace(/\D/g, '');
  return { ...defaultSettings, whatsappNumber: /^\d{10,15}$/.test(configured) ? configured : null };
}
