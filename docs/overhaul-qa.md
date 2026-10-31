# Premium revizyon — görsel ve teknik kabul kaydı

**Tarih:** 30–31 Ekim 2026. **Dal:** `feat/premium-visual-overhaul`. Başlangıç: PR #1, `1e84922`. Bu kayıt eski `premium-qa.md` ölçümlerinin yerini alır. İncelenen kaynak kodu ve önceki ekranlar bu PR dalındandır; referans ölçümleri [REA raporunda](reverse-engineering-report.md), video analizi [buradadır](reference-video-analysis.md).

## Görsel kararlar

- Mevcut 19 AI görseli tek tek [temas sayfasında](overhaul-evidence/asset-audit.jpg) incelendi. 11 ürün fotoğrafı ışık, kadraj ve arka plan açısından tutarlı; belirgin bir artefakt veya yanlış meyve anatomisi görülmedi. Mevcut ürün çekimleri korundu.
- Masaüstü hero üç sahnesi korundu. Mobil için her sahneye ayrı 2:3 kompozisyon üretildi ve 640 px WebP türevleri oluşturuldu. İlk ekran metni fotoğrafın ayrılmış üst alanına taşındı; h1 ilk boyamada görünür.
- Gerçek mağaza izlenimi verebilecek iki hayalî kafe görseli ana sayfadan çıkarıldı. Yerlerine Migros menüsündeki gerçek Wrapples ürünlerinin üç küçük fotoğrafı geldi. 330×330 px gerçek fotoğraflar büyük banner olarak kullanılmadı. Kullanıcının işletme adına verdiği yeniden kullanım izni ve fotoğrafçı hak zinciri sınırı [medya denetiminde](real-media-audit.md).
- Menüde kategori filtreleri üst navigasyonun altında sabit, mobil ürünler iki sütunlu ve son tek kart ortalı. 320 px'te tek sütuna dönüyor. Tüm 11 ürün ve mevcut modal/WhatsApp seçimi korunuyor.
- İletişim sayfasında fotoğraf banner, doğrudan WhatsApp CTA, gerçek tabela ve adres kartlı Google Maps yerleşimi var. Harita ayrıca [masaüstü](overhaul-evidence/after-desktop-map.jpg) ve [mobil](overhaul-evidence/after-mobile-map.jpg) kaydırılmış ekranlarda gerçekten görüntülendi. Harita engellenirse doğrudan yol tarifi bağlantısı ve adres kartı görünür.

## İki görsel QA turu

| Tur | İncelenen kanıt | Bulgu ve düzeltme |
| --- | --- | --- |
| PR başlangıcı | [masaüstü hero](overhaul-evidence/before-desktop-hero.jpg), [mobil hero](overhaul-evidence/before-mobile-hero.jpg), [mobil menü](overhaul-evidence/before-mobile-menu.jpg), [iletişim](overhaul-evidence/before-desktop-contact.jpg) | Mobil metin ürünün üstündeydi; 11 ürün tek sütunda çok uzundu; iletişim haritası geniş boş alan bırakıyordu. |
| 1. tur | [mobil hero](overhaul-evidence/pass1-mobile-hero.jpg), [mobil menü](overhaul-evidence/pass1-mobile-menu.jpg), [masaüstü iletişim](overhaul-evidence/pass1-desktop-contact.jpg) | Mobil hero metni hâlâ aşağıdaydı; son menü kartı boşlukta kalıyordu. Metin hizası ve son kart düzeltildi. |
| 2. tur | [masaüstü ana sayfa](overhaul-evidence/after-desktop-home.jpg), [mobil hero](overhaul-evidence/after-mobile-hero.jpg), [mobil menü](overhaul-evidence/after-mobile-menu.jpg), [iletişim](overhaul-evidence/after-desktop-contact.jpg), [galeri](overhaul-evidence/after-desktop-gallery.jpg), [mobil modal](overhaul-evidence/after-mobile-dialog.jpg), [mobil navigasyon](overhaul-evidence/after-mobile-navigation.jpg) | Hero üst alanı okunaklı ve ürün görünür; son ürün kartı dengeli. Lazy Google iframe'i tam sayfa ekran görüntüsünde boş çıkabildiği için kaydırılmış harita kareleri ayrıca alındı. |

Puanlar görsel kanıta dayalı öznel tasarım değerlendirmesidir (10 üzerinden); kullanıcı araştırması veya ödül standardı iddiası değildir.

| Alan | PR başlangıcı | Son | Kanıt |
| --- | ---: | ---: | --- |
| Hero | 7 | 8.5 | Mobil ayrı kadraj, başlık yeri, ilerleme çizgisi |
| Tipografi | 8 | 8 | Cormorant/DM Sans korundu; tutarlılık iyi |
| Fotoğraf kalitesi | 8 | 8 | 11 ürün çekimi korundu; mobil hero eklendi |
| Görsel bütünlük | 7 | 8 | Hayalî iç mekânlar çıkarıldı, gerçek ürün vitrini eklendi |
| Animasyon | 7 | 7.5 | Masked reveal, hafif parallax, stagger, azaltılmış hareket desteği |
| Menü UX | 6 | 8 | Sabit filtre, sonuç sayısı, iki sütun mobil |
| Mobil deneyim | 6 | 8 | 320–430 px denetimi ve ayrı hero |
| İletişim sayfası | 5 | 8 | Fotoğraf banner, WhatsApp, adres kartı ve çalışan harita |
| Marka özgünlüğü | 7 | 8 | Gerçek ürün ve tabela daha belirgin |
| Genel premium hissi | 7 | 8 | Daha tutarlı fotoğraf ölçeği ve akış |

## Testler ve performans

- `npm ci --no-audit --no-fund`, `npm run typecheck`, `npm run lint`, `npm run build` geçti. İlk build, eski `main` dalından kalmış `.next` tür dosyaları yüzünden başarısızdı; üretilmiş klasör arşivlenip temiz build başarıyla çalıştı. 31 Ekim'deki son yalnız biçimsel JSX düzenlemesinden sonra bu oturumun kısıtlı profilinde Turbopack/PostCSS yerel portu engellendi; son kaynak kodu `npx next build --webpack` ile başarıyla derlendi.
- Playwright üretim E2E: **27 geçti, 7 koşula bağlı atlandı, 0 başarısız**. Ayrıca son görsel kayıt koşusunda **4/4 geçti**. 320, 375, 390, 430, 768, 1024, 1440, 1920 px'te dört public rota ve yatay taşma denetlendi. Kategori, modal, Escape/focus return, gövde scroll kilidi, WhatsApp numarası/mesajı, bozuk görseller ve reduced motion kontrol edildi.
- [İlk Lighthouse mobil](overhaul-evidence/lighthouse-mobile.json): Performance 56, Accessibility 100, SEO 100, LCP 5.3 s, CLS 0. [Son mobil](overhaul-evidence/lighthouse-mobile-final.json): **93 / 100 / 100**, LCP **1.8 s**, CLS **0**.
- [İlk Lighthouse masaüstü](overhaul-evidence/lighthouse-desktop.json): 73 / 100 / 100. [Son masaüstü](overhaul-evidence/lighthouse-desktop-final.json): **100 / 100 / 100**, LCP **0.2 s**, CLS **0.004**.
- Bu değerler localhost üretim derlemesinde laboratuvar ölçümüdür. Gerçek kullanıcı INP, alan adı ve canlı CDN koşulları henüz ölçülmedi. `NEXT_PUBLIC_SITE_URL` canlı URL belirlenince ayarlanmalı; aksi halde Next social metadata için localhost varsayar.

## Yeni görsel üretimi ve provenance

Üç yeni mobil fotoğraf **built-in imagegen** ile üretildi; gerçek işletme ürünü diye sunulmaz. Sayfada “Temsili sunum · AI görseli” etiketi korunur. Tam çözünürlüklü çıktılar `hero-mobile-{classic,kova,bowl}.webp`, küçük indirme varyantları `-640.webp` adlarıyla `public/images/premium/` altındadır. [Tam promptlar](mobile-hero-prompts.md) saklandı; kısa özet:

1. `hero-mobile-classic`: “Photorealistic premium commercial food photograph, vertical 2:3; single Belgian waffle on dark ceramic plate, glossy realistic chocolate, strawberry and banana; waffle in lower half slightly right; upper 45% dark cocoa tabletop negative space; warm side daylight, tactile linen, no text or brand.”
2. `hero-mobile-kova`: “Photorealistic 2:3 dessert campaign; kraft bucket with Belgian waffle cubes, glossy milk chocolate, strawberry, banana and kiwi; bucket in lower half slightly right; upper 45% dark cocoa negative space; warm cinematic daylight; no text, logo, hands or café.”
3. `hero-mobile-bowl`: “Photorealistic 2:3 dessert campaign; dark ceramic bowl of waffle bites, glossy chocolate, fresh strawberry, banana and kiwi; bowl in lower half slightly right; upper 45% cocoa negative space; tactile linen, warm daylight; no text, logo, hands or café.”

Promptların amacı mobil metin alanı ve mevcut üç sahnenin tutarlı ışık diliydi. Bu kadrajlar özgündür; referans sitelerin görselleri kullanılmadı.

## Kalan sınırlar

- Canlı alan adı, dağıtım ve gerçek kullanıcı Core Web Vitals verisi yok. PR `main` dalına birleştirilmedi.
- WhatsApp bağlantısı `905402560609` ve seçilen ürün/tercih/adet/not ile test edildi; mesajın kullanıcı tarafından gönderilmesi ve işletmenin yanıtı tarayıcı testiyle doğrulanamaz.
- Google Maps üçüncü taraf iframe'idir; ağ veya kullanıcı engelleyicisi nedeniyle görünmezse adres kartı ve doğrudan harita bağlantısı kullanılır. Tam sayfa ekran görüntüsü lazy iframe'i boş yakalayabilir; kaydırılmış kareler haritanın yüklenmesini doğrular.
- Gerçek fotoğrafların yeniden yayımına işletme adına kullanıcı izni verildi; kaynak platformdaki fotoğrafçı hak zinciri ayrıca bağımsız doğrulanmadı.
