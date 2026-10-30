'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
const scenes = [
  { id: 'hero-classic', name: 'Klasik Waffle', title: <>Mutluluğun<br/><em>çıtır</em> hâli.</>, text: 'Çikolatanın, meyvenin ve güzel bir molanın tam ortasında.', position: '64% center' },
  { id: 'hero-kova', name: 'Kova Waffle', title: <>Bir kova<br/><em>güzel</em> an.</>, text: 'Waffle parçaları, çikolata ve meyveler. Keyfine göre bir sunum.', position: '70% center' },
  { id: 'hero-bowl', name: 'Bowl Waffle', title: <>Günün en<br/><em>tatlı</em> yanı.</>, text: 'Bir kaşık waffle, biraz çikolata, kendine ayırdığın bir an.', position: '70% center' },
];
export function HeroGallery() {
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  return <section className="home-hero" id="baslangic" aria-roledescription="görsel galerisi" aria-label="Wrapples waffle sunumları">
    <div className="hero-media" data-parallax><div className="hero-photo" key={scene.id}><Image src={`/images/premium/${scene.id}.webp`} alt={`${scene.name}, çikolata ve taze meyve ile yapay zekâ temsili sunumu`} fill preload={active === 0} sizes="100vw" style={{ objectPosition: scene.position }}/></div></div><div className="hero-scrim"/>
    <div className="hero-content section-shell"><div className="hero-kicker"><span className="eyebrow">AYDIN · EFELER · GÜZELHİSAR</span><span>WAFFLE İÇİN GÜZEL BİR GÜN</span></div><div className="hero-copy" key={scene.name}><span className="hero-mini">KÜÇÜK BİR MOLA. BÜYÜK BİR KEYİF.</span><h1>{scene.title}</h1><p>{scene.text}</p><Link className="hero-button" href="/menu">MENÜYÜ KEŞFET <ArrowUpRight size={19}/></Link></div>
    <div className="hero-bottom"><a className="hero-scroll" href="#hikaye">KEŞFETMEYE DEVAM ET <ArrowDown size={16}/></a><div className="hero-controls"><button aria-label="Önceki sunum" onClick={() => setActive((active + 2) % 3)}><ArrowLeft size={18}/></button><span aria-live="polite">0{active + 1} <i>/ 03</i></span><button aria-label="Sonraki sunum" onClick={() => setActive((active + 1) % 3)}><ArrowRight size={18}/></button></div></div></div>
    <span className="hero-disclosure">Temsili sunum · AI görseli</span>
  </section>;
}
