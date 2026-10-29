import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { AdminLogin } from '@/components/AdminLogin';
export const metadata = { title: 'İşletme Girişi' };
export default async function LoginPage() { if (await isAdmin()) redirect('/admin'); return <section className="admin-login"><div><span className="eyebrow">YALNIZCA İŞLETME YETKİLİSİ</span><h1>Yönetim<br/><em>girişi.</em></h1><AdminLogin/></div></section>; }
