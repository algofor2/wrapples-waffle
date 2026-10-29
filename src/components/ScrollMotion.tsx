'use client';
import { useEffect } from 'react';
export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.dataset.motionReady = 'true';
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); } }); }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
    targets.forEach(el => observer.observe(el));
    let frame = 0;
    const onScroll = () => { if (frame) return; frame = requestAnimationFrame(() => { document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => { const rect = el.getBoundingClientRect(); if (rect.bottom > 0 && rect.top < innerHeight) el.style.setProperty('--parallax-y', `${Math.round((innerHeight / 2 - rect.top - rect.height / 2) * .07)}px`); }); frame = 0; }); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); delete root.dataset.motionReady; };
  }, []);
  return null;
}
