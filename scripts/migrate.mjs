import fs from 'node:fs';
import pg from 'pg';
import { seedProducts } from '../src/lib/catalog.ts';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL gerekli');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  await pool.query(fs.readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
  for (const [sort, p] of seedProducts.entries()) {
    await pool.query(`INSERT INTO products (id,name,category,description,image_url,image_alt,available,featured,choices,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (id) DO UPDATE SET image_url=EXCLUDED.image_url,image_alt=EXCLUDED.image_alt WHERE products.image_url IS NULL OR products.image_url LIKE '/images/concept-%'`, [p.id,p.name,p.category,p.description,p.imageUrl,p.imageAlt,p.available,p.featured,JSON.stringify(p.choices),sort]);
  }
  console.log('Şema ve başlangıç ürünleri hazır.');
} finally { await pool.end(); }
