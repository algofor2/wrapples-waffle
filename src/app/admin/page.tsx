import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { getProducts, getSettings } from '@/lib/db';
import { AdminDashboard } from '@/components/AdminDashboard';
export const metadata = { title: 'İşletme Yönetimi' };
export const dynamic = 'force-dynamic';
export default async function AdminPage() { if (!(await isAdmin())) redirect('/admin/login'); const [products, settings] = await Promise.all([getProducts(), getSettings()]); return <section className="section-shell admin-page"><AdminDashboard products={products} settings={settings}/></section>; }
