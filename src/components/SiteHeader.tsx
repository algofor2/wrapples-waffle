'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [['/', 'Ana Sayfa'], ['/menu', 'Ürünler'], ['/galeri', 'Galeri'], ['/iletisim', 'İletişim']];
export function SiteHeader({ whatsappNumber }: { whatsappNumber: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, [pathname]);
  return <header className="site-header" data-hero={pathname === '/' && !scrolled && !open ? 'true' : 'false'}>
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Wrapples Waffle ana sayfa" onClick={() => setOpen(false)}><span className="brand-seal">W<span>✳</span></span><span className="brand-type">wrapples<small>WAFFLE CAFE · AYDIN</small></span></Link>
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Ana menü">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <div className="header-actions">{whatsappNumber && <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Merhaba Wrapples Waffle, ürünleriniz hakkında bilgi almak istiyorum.')}`} className="header-whatsapp" target="_blank" rel="noreferrer">WHATSAPP <ArrowUpRight size={15}/></a>}<button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button></div>
    </div>
  </header>;
}
