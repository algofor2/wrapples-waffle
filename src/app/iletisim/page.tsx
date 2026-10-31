import { canonicalMetadata } from '@/lib/site-url';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Phone, Clock3, MessageCircle } from 'lucide-react';
import { getSettings } from '@/lib/storefront';
import { ScrollMotion } from '@/components/ScrollMotion';
export const metadata: Metadata = { ...canonicalMetadata('/iletisim'), title: 'İletişim ve Konum', description: 'Wrapples Waffle, Adnan Menderes Bulvarı 39 B, Güzelhisar, Efeler / Aydın.' };
export const dynamic = 'force-dynamic';
export default async function ContactPage() {
  const settings = await getSettings();
  const directions = 'https://maps.app.goo.gl/iCZPwHDjEikDu9Vb7?g_st=iw';
  const wa = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Merhaba Wrapples Waffle, size bir sorum var.')}`
    : null;

  return <>
    <ScrollMotion/>
    <section className="page-hero contact-hero">
      <Image className="contact-hero-photo" src="/images/premium/table.webp" alt="Waffle çeşitlerinden oluşan temsili sunum" fill sizes="100vw" fetchPriority="high"/>
      <div className="contact-hero-shade"/>
      <div className="section-shell">
        <span className="eyebrow">AYDIN / EFELER / GÜZELHİSAR</span>
        <h1>İletişim<span>.</span></h1>
        <p>Bir waffle mesafesinde.</p>
      </div>
      <span className="contact-hero-disclosure">Temsili sunum · AI görseli</span>
    </section>

    <section className="contact-section section-shell">
      <div className="contact-heading" data-reveal>
        <span className="eyebrow coral">BİZE ULAŞIN</span>
        <h2>Bir merhaba<br/><em>yeter.</em></h2>
        <p>Menü hakkında soru sormak veya sipariş talebi iletmek için bize yazabilirsiniz.</p>
        {wa && <a className="button-primary contact-primary" href={wa} target="_blank" rel="noreferrer">WHATSAPP&apos;TAN YAZ <ArrowUpRight size={18}/></a>}
      </div>
      <div className="contact-details">
        <div className="contact-line" data-reveal><MapPin/><div><strong>Adres</strong><p>{settings.address}</p></div></div>
        <div className="contact-line" data-reveal><Phone/><div><strong>Telefon</strong><p><a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a></p></div></div>
        {settings.hours && <div className="contact-line" data-reveal><Clock3/><div><strong>Çalışma saatleri</strong><p>{settings.hours}</p></div></div>}
        {wa && <div className="contact-line" data-reveal><MessageCircle/><div><strong>WhatsApp</strong><p><a href={wa} target="_blank" rel="noreferrer">Mesaj gönder ↗</a></p></div></div>}
        {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-link">INSTAGRAM <ArrowUpRight size={17}/></a>}
        <figure className="storefront-sign" data-reveal>
          <Image src="/images/wrapples-storefront-sign.webp" alt="Wrapples Waffle Cafe mağaza tabelası" fill sizes="(max-width: 760px) 100vw, 450px"/>
          <figcaption>GERÇEK MAĞAZA TABELASI · AYDIN</figcaption>
        </figure>
      </div>
    </section>

    <section className="map-section">
      <div className="section-shell map-heading" data-reveal>
        <span className="eyebrow coral">TEK ADRESİMİZ</span>
        <h2>Burada<br/><em>buluşalım.</em></h2>
        <a className="text-link" href={directions} target="_blank" rel="noreferrer">GOOGLE MAPS&apos;TE AÇ <ArrowUpRight size={19}/></a>
      </div>
      <div className="section-shell map-layout">
        <div className="map-place" data-reveal>
          <MapPin size={35} strokeWidth={1.3}/>
          <span className="eyebrow">WRAPPLES WAFFLE CAFE</span>
          <h3>Güzelhisar,<br/>Efeler.</h3>
          <p>{settings.address}</p>
          <a href={directions} className="button-primary" target="_blank" rel="noreferrer">YOL TARİFİ AL <ArrowUpRight size={18}/></a>
          <small>Harita görüntülenmezse yol tarifi bağlantısını kullanabilirsiniz.</small>
        </div>
        <div className="map-frame" data-reveal="image">
          <iframe title="Wrapples Waffle Google Maps konumu" src="https://www.google.com/maps?q=Wrapples%20Waffle%20Adnan%20Menderes%20Bulvari%2039%20B%20Efeler%20Aydin&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
          <a className="map-open-link" href={directions} target="_blank" rel="noreferrer">HARİTAYI AÇ <ArrowUpRight size={16}/></a>
        </div>
      </div>
    </section>
  </>;
}
