import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const cookieName = 'wrapples-admin';
function key() { const secret = process.env.SESSION_SECRET; if (!secret || secret.length < 32) throw new Error('SESSION_SECRET en az 32 karakter olmalı'); return new TextEncoder().encode(secret); }
export async function createSession(): Promise<string> { return new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('12h').sign(key()); }
export async function isAdmin(): Promise<boolean> { try { const token = (await cookies()).get(cookieName)?.value; if (!token) return false; const result = await jwtVerify(token, key(), { algorithms: ['HS256'] }); return result.payload.role === 'admin'; } catch { return false; } }
export function adminCookie(token: string) { return { name: cookieName, value: token, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: 60 * 60 * 12 }; }
export function clearAdminCookie() { return { name: cookieName, value: '', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: 0 }; }
export function validOrigin(request: Request): boolean { const origin = request.headers.get('origin'); if (!origin) return false; try { return new URL(origin).host === new URL(request.url).host; } catch { return false; } }
