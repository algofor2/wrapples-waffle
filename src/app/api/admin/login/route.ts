import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { adminCookie, createSession, validOrigin } from '@/lib/auth';
import { getPool } from '@/lib/db';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'Geçersiz istek kaynağı' }, { status: 403 });
  if (!getPool() || !process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) return NextResponse.json({ error: 'Yönetim paneli yapılandırılmamış' }, { status: 503 });
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password || password.length > 200 || !(await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH))) return NextResponse.json({ error: 'Şifre geçersiz' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie(await createSession()));
  return response;
}
