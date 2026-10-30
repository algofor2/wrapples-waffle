'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function ScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;
    const stop = () => { observer?.disconnect(); mutations?.disconnect(); delete root.dataset.motionReady; document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => el.style.removeProperty('--parallax-y')); };
    const start = () => {
      stop();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      root.dataset.motionReady = 'true';
      observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer?.unobserve(entry.target); } }), { threshold: .06, rootMargin: '0px 0px -20px 0px' });
      const observe = () => document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-visible])').forEach(el => observer?.observe(el));
      observe();
      mutations = new MutationObserver(observe);
      mutations.observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
    };
    const onScroll = () => {
      if (frame || preference.matches || innerWidth < 768) return;
      frame = requestAnimationFrame(() => { document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => { const rect = el.getBoundingClientRect(); if (rect.bottom > 0 && rect.top < innerHeight) el.style.setProperty('--parallax-y', `${Math.max(-28, Math.min(28, (innerHeight / 2 - rect.top - rect.height / 2) * .055))}px`); }); frame = 0; });
    };
    start(); onScroll();
    preference.addEventListener('change', start);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { stop(); preference.removeEventListener('change', start); window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [pathname]);
  return null;
}
