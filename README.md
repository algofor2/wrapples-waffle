# Wrapples Waffle

Aydın/Efeler için Next.js tabanlı waffle ürün vitrini. Menüde 11 waffle var; fiyat, franchise ve sepet yok. Her ürün adet ve not içeren doğrudan WhatsApp sipariş talebi oluşturur.

## Yerel çalıştırma

```bash
npm install
npm run dev
```

`http://localhost:3000` adresinde açılır. Üretim doğrulaması için `npm run build && npm run start` kullanın. Varsayılan WhatsApp numarası, kullanıcı tarafından doğrulanan `905402560609` değeridir. Ortam değişkenleri [.env.example](.env.example) dosyasında.

İşletme yönetim panelinin veri yazması için PostgreSQL `DATABASE_URL`, `ADMIN_PASSWORD_HASH` ve `SESSION_SECRET` ayarlanmalı, ardından `npm run db:migrate` çalıştırılmalıdır. Veri tabanı yokken halka açık vitrin 11 başlangıç ürünüyle çalışır; yönetim paneli kalıcı değişiklik yapamaz.

## Kanıt ve içerik

- [Üç referans için REA/Playwright raporu](docs/reverse-engineering-report.md)
- [Kullanıcı videosu kare analizi](docs/reference-video-analysis.md)
- [Gerçek fotoğraflar, eşleşme ve izin denetimi](docs/real-media-audit.md)
- [Görsel karşılaştırma](docs/visual-comparison.md)
- [Masaüstü](docs/desktop-home-final.png) ve [mobil](docs/mobile-home-final.png) ekran görüntüleri

`npm run typecheck`, `npm run lint` ve `npm run test:e2e` doğrulama komutlarıdır. E2E testi için önce `npm run build` çalıştırın.
