import { Pool } from 'pg';
import { defaultSettings, seedProducts, type Product, type PublicSettings } from './catalog';

const globalDb = globalThis as unknown as { wafflePool?: Pool };
export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalDb.wafflePool) globalDb.wafflePool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: true } });
  return globalDb.wafflePool;
}

export async function getProducts(): Promise<Product[]> {
  const db = getPool();
  if (!db) return seedProducts;
  const result = await db.query('SELECT id, name, category, description, image_url AS "imageUrl", image_alt AS "imageAlt", available, featured, choices FROM products ORDER BY sort_order, name');
  return result.rows.map(row => ({ ...row, choices: row.choices || [] })) as Product[];
}

export async function getSettings(): Promise<PublicSettings> {
  const db = getPool();
  let values: Record<string, string> = {};
  if (db) {
    const result = await db.query('SELECT key, value FROM settings');
    values = Object.fromEntries(result.rows.map(row => [row.key, row.value]));
  }
  const number = (values.whatsappNumber !== undefined ? values.whatsappNumber : process.env.WHATSAPP_ORDER_NUMBER || defaultSettings.whatsappNumber || '').replace(/\D/g, '');
  return {
    ...defaultSettings,
    whatsappNumber: /^\d{10,15}$/.test(number) ? number : null,
    deliveryEnabled: values.deliveryEnabled === 'true',
    address: values.address || defaultSettings.address,
    phone: values.phone || defaultSettings.phone,
    instagram: values.instagram || null,
    hours: values.hours || null,
    campaign: values.campaign || null,
  };
}
