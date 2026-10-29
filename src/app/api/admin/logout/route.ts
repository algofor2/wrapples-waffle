import { NextRequest, NextResponse } from 'next/server';
import { clearAdminCookie, validOrigin } from '@/lib/auth';
export async function POST(request: NextRequest) { if (!validOrigin(request)) return NextResponse.json({ error: 'Geçersiz istek' }, { status: 403 }); const response = NextResponse.json({ ok: true }); response.cookies.set(clearAdminCookie()); return response; }
