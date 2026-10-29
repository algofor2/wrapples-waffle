import { NextRequest, NextResponse } from 'next/server';
import { isAdmin, validOrigin } from '@/lib/auth';
import { getPool } from '@/lib/db';
import { productSchema } from '@/lib/validation';
export const runtime = 'nodejs';
export async function PUT(request: NextRequest) {
  if (!validOrigin(request) || !(await isAdmin())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  const parsed = productSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const db = getPool(); if (!db) return NextResponse.json({ error: 'Veri tabanı bağlı değil' }, { status: 503 });
  const p = parsed.data;
  await db.query('INSERT INTO products (id,name,category,description,image_url,image_alt,available,featured,choices) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO UPDATE SET name=$2,category=$3,description=$4,image_url=$5,image_alt=$6,available=$7,featured=$8,choices=$9', [p.id,p.name,p.category,p.description,p.imageUrl||null,p.imageAlt||null,p.available,p.featured,JSON.stringify(p.choices)]);
  return NextResponse.json({ ok: true });
}
export async function DELETE(request: NextRequest) {
  if (!validOrigin(request) || !(await isAdmin())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !/^[a-z0-9-]{2,60}$/.test(id)) return NextResponse.json({ error: 'Geçersiz ürün' }, { status: 400 });
  const db = getPool(); if (!db) return NextResponse.json({ error: 'Veri tabanı bağlı değil' }, { status: 503 });
  await db.query('DELETE FROM products WHERE id=$1', [id]);
  return NextResponse.json({ ok: true });
}
