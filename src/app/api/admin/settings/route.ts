import { NextRequest, NextResponse } from 'next/server';
import { isAdmin, validOrigin } from '@/lib/auth';
import { getPool } from '@/lib/db';
import { settingsSchema } from '@/lib/validation';
export const runtime = 'nodejs';
export async function PUT(request: NextRequest) {
  if (!validOrigin(request) || !(await isAdmin())) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  const parsed = settingsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const db = getPool(); if (!db) return NextResponse.json({ error: 'Veri tabanı bağlı değil' }, { status: 503 });
  const values = parsed.data;
  const client = await db.connect();
  try { await client.query('BEGIN'); for (const [key, value] of Object.entries(values)) await client.query('INSERT INTO settings (key,value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value=$2', [key, String(value)]); await client.query('COMMIT'); } catch (e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); }
  return NextResponse.json({ ok: true });
}
