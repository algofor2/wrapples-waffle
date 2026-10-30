# Wrapples Waffle

Aydın/Efeler'de tek şubeli, fiyat göstermeyen waffle ürün vitrini. 11 waffle ürünü, premium görseller, scroll animasyonları ve kişiselleştirilmiş WhatsApp sipariş talebi içerir.

**Yönetici paneli, giriş ekranı ve veritabanı yoktur.** Ürünler `src/lib/catalog.ts` içindeki sabit katalogdan okunur. WhatsApp numarası isteğe bağlı `WHATSAPP_ORDER_NUMBER` ile ayarlanabilir. Doğrulanmış varsayılan numara: `905402560609`.

## Çalıştırma

```bash
npm ci
npm run dev
```

Üretim: `npm run typecheck && npm run lint && npm run build`.
Playwright: `npm run test:e2e` (Chromium kurulumu gerekebilir).

## İçerik değiştirme

- Waffle ürünleri, malzeme seçenekleri, açıklamalar ve görsel yolları: `src/lib/catalog.ts`
- Ürün görselleri: `public/images/premium/`
- Adres ve telefon: `src/lib/catalog.ts` içindeki `defaultSettings`
- WhatsApp numarası: `WHATSAPP_ORDER_NUMBER`
- Gerçek alan adı: `NEXT_PUBLIC_SITE_URL`

İçerik güncellemeleri kod üzerinden yapılıp yeniden deploy edilir. Site üzerinden yönetici hesabı açılmaz. Siparişler kullanıcı WhatsApp mesajını gönderince işletmeye ulaşır; fiyat, sepet ve franchise özelliği yoktur.

## Referanslar

- [Tasarım araştırması](docs/DESIGN.md)
- [REA incelemesi](docs/reverse-engineering-report.md)
- [Gerçek fotoğraf denetimi](docs/real-media-audit.md)
- [Premium görsel manifesti](docs/premium-image-manifest.json)
- [Önce/sonra ekran görüntüleri](docs/premium-evidence/)

Önceki tarihli QA kayıtlarında yönetim paneli referansları bulunabilir; bu sürümde panel ve API uçları tamamen kaldırılmıştır.
