# Referans video incelemesi — Sweet Waffle

İncelenen dosya: kullanıcı eki `Ekran Kaydı 2026-10-29 13.09.20.mov`. `ffprobe` sonucu **49,311667 saniye**, **3024×1964 px**, **120 fps**. FFmpeg ile 0–48. saniyelerde kareler çıkarıldı: [temas sayfası](video-evidence/contact-sheet.jpg), [kare klasörü](video-evidence/). Ekran kaydındaki Safari penceresi ekranın tamamını doldurmuyor; aşağıdaki ölçüler içerik penceresinin yaklaşık 1160×780 px kırpımı ve ayrıca [önceki REA/Playwright ölçümleri](reverse-engineering-report.md) ile karşılaştırıldı. Video yarışmacının görsellerini veya kodunu yeniden kullanma izni sağlamaz.

## Zaman çizelgesi ve bölüm sırası

| Zaman | Görünen durum | Somut gözlem |
| --- | --- | --- |
| [0 s](video-evidence/site-0.jpg) | Ana sayfa hero | Tam pencereyi kaplayan waffle fotoğrafı; sol alana yerleşen yaklaşık 70 px beyaz başlık, bir satır açıklama ve mercan CTA. Fotoğraf ekranın yaklaşık %75'ini görsel olarak domine ediyor. İnce koyu yarı saydam üst menü fotoğrafın üzerinde. |
| [2 s](video-evidence/frame-2.jpg) | Hero altına geçiş | Fotoğraf yukarı kayarken 100 px civarı sabit header açık krem zemine dönüyor. Hero ile sonraki bölüm arasında geniş boşluk var. |
| [4 s](video-evidence/site-4.jpg) | Marka tanıtımı | Sol yarıda büyük ürün fotoğrafı, sağda yaklaşık 36 px koyu başlık ve kısa paragraf. 2 sütun, görsel/metin oranı yaklaşık 48/52. |
| [6 s](video-evidence/site-6.jpg) | Deneyim/ürün görseli | İki büyük poster benzeri görsel ve bol beyaz alan; başlık fotoğraf öncesinde üstte. |
| [8 s](video-evidence/site-8.jpg) | Galeri | 3 sütunlu asimetrik görsel mozaiği; kenarlar yaklaşık 6–12 px yuvarlak, aralıklar yaklaşık 15–20 px. Fotoğraflar ekranın üst %50'sini dolduruyor, altta belirgin boşluk bırakılıyor. |
| [10 s](video-evidence/site-10.jpg) | Ürün kategorileri | Açık krem zemin; küçük yuvarlak ürün görselleri ve mercan renkli kategori adları. Görseller kart çerçevesi yerine daire içinde. Bölüm altına ortalı “Waffle Maker” başlığı geliyor. |
| [12 s](video-evidence/site-12.jpg) | Waffle Maker adımları | 4 eşit aralıklı pastel pembe daire/ikon, altında kısa başlıklar. Sonrasında içerik görselleri başlıyor. |
| [15 s](video-evidence/site-15.jpg) | İçerik seçimi | Ürün malzemeleri geniş açık zemin üzerinde çok sütunlu görsel listesi. |
| [18 s](video-evidence/site-18.jpg) | Ana sayfa sonu | İki açıklama sütunu, altında çok koyu kahve footer. Videodaki franchise metni bu projeye alınmıyor. |
| [21–39 s](video-evidence/site-27.jpg) | Hakkımızda ve ürün sayfaları arasında gezinme | Ürün sayfasında kısa fotoğraf banner + beyaz büyük başlık, altında 3 sütunlu büyük fotoğraflı kategori panelleri. Hakkımızda sayfasında benzer fotoğraf banner ve büyük görsel/metin blokları. |
| [42 s](video-evidence/site-42.jpg) | İletişim alt bölüm | Açık zemindeki iletişim formunun hemen ardından tam genişlik interaktif harita. |
| [48 s](video-evidence/site-48.jpg) | İletişim ilk ekran | Yaklaşık 320 px yüksek fotoğraf banner, solda büyük beyaz “İletişim” başlığı ve kırıntı yolu. Altında ortalı başlık, 3 sütunda iletişim ayrıntısı, sonra lokasyon kartları. |

## Bileşen ve hareket okuması

- **Header:** Fotoğraf üzerinde yarı saydam koyu; açık bölümlerde krem. Video boyunca üstte sabit. Yaklaşık 100–105 px yüksek. Logo solda, linkler ortada, yardımcı işlemler sağda. Mobilde canlı site/REA kaydı [375 px ekran](reverse-evidence/sweet-mobile.png) header'ı yaklaşık 88 px ve daraltılmış navigasyonu gösteriyor.
- **Hero:** Görsel tam genişlik, yüksekliği yaklaşık viewport kadar. Başlık ve CTA sol alt üçte, ürün sağ/orta. Çoklu slider olduğunu oklar ve alt çizgiler doğruluyor. İlk ekrandaki görselin oranı 16:9'a yakın, üstünde koyu okuma katmanı var.
- **Tipografi:** Ekran kaydında sans başlık; REA computed-style ölçümü masaüstü h1 **72/90 px**, gövde Roboto **16/24 px**. Başlıkların ağırlığı 700; menü etiketleri küçük büyük harf. Bölüm başlıkları yaklaşık 30–36 px.
- **Renk:** Krem `rgb(251,247,240)`, koyu çikolata metni `rgb(42,26,16)`, mercan vurgu. Footer yaklaşık `#26150f` tonunda. Kompozisyonun ana kalitesi renklerden çok geniş boşluk ve fotoğraf ölçeğinden geliyor.
- **Kaydırma/geçiş:** Videoda görseller ve metin bölümleri kademeli görünür; ekran kaydı tek başına bunun CSS/JS reveal mi, yalnız scroll pozisyonu mu olduğunu kesin kanıtlamıyor. Hero/header zemin değişimi ve bölüm ritmi açıkça gözleniyor. Uygulama kararı olarak 0,45–0,8 s arası opacity/translate reveal, görsel mask ve hafif parallax kullanılacak; bunlar referansın kesin easing değeri olarak iddia edilmiyor.
- **Ürün sunumu:** Ana sayfa dairesel kategori vitrini, ürün sayfası büyük 3 sütunlu fotoğraf panelleri kullanıyor. Wrapples için yalnız doğrulanmış waffle kategorileri alınacak. Video menü fiyatı göstermiyor; Wrapples arayüzünde de hiçbir fiyat olmayacak.
- **İletişim:** Kısa fotoğraf banner → ortalı iletişim başlığı → tek lokasyon bilgisi → harita. Wrapples'ta çoklu şube kartı ve franchise çıkarılacak.

## Wrapples uygulama kararı

Koyu, kart merkezli önceki kompozisyon yerine açık krem zemin, fotoğraf alanı geniş hero, sabit header, 2 sütunlu tanıtım, 3 sütunlu galeri/kategori ritmi ve koyu footer kullanılacak. Orijinal marka fotoğrafları için kaynak ve izin denetimi [gerçek medya denetiminde](real-media-audit.md). Yayın hakkı olmayan veya eşleşmesi belirsiz kaynak fotoğraflar siteye alınmadı. Kullanıcının sonraki açık isteğiyle bu beş ürün için üretilen görseller “temsili görsel” etiketiyle kullanıldı. Animasyonlar IntersectionObserver ile gerçekten tetiklenecek, mobilde hafifletilecek ve `prefers-reduced-motion` altında kapatılacak. Bu kararlar referansın ölçülen hiyerarşisinden türetilmiştir; marka/görsel/kod kopyası değildir.
