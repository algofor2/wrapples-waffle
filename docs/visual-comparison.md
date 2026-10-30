# Video ile görsel karşılaştırma ve revizyon kaydı

Tarih: 29 Ekim 2026. Video kanıtı: [49 saniyelik temas sayfası](video-evidence/contact-sheet.jpg). Eski tasarım görüntüleri: [masaüstü](desktop-home-preview.png), [mobil](mobile-home-preview.png). Güncel üretim sunucusu görüntüleri: [masaüstü ana sayfa](desktop-home-final.png), [mobil ana sayfa](mobile-home-final.png), [masaüstü menü](desktop-menu-final.png), [mobil menü](mobile-menu-final.png), [galeri](desktop-galeri-final.png), [iletişim](desktop-iletisim-final.png).

| Video gözlemi | Eski durum | Revizyon |
| --- | --- | --- |
| Tam ekran, fotoğrafın domine ettiği hero | Koyu konsept görselli, aşırı büyük dekoratif başlık | Wrapples Migros menüsündeki üç gerçek waffle fotoğrafıyla hero; sol hizalı beyaz metin, mercan çağrı butonu, üstte saydam sabit header. |
| Açık krem 2 sütun tanıtım | Koyu arka plan, döndürülmüş konsept kart | Klasik Waffle gerçek fotoğrafı solda; kısa marka metni sağda. |
| Asimetrik fotoğraf mozaiği | Tekdüze ürün kartları | Üç kolonlu, farklı yüksekliğe sahip fotoğraf mozaik ve editoryal metin alanı. |
| Dairesel ürün kategorileri | Yok | Dört gerçek ürün fotoğrafı daire şeklinde, mobilde iki kolona iner. |
| Bölümler kaydırıldıkça açılıyor | Eski animasyonlar tutarsız | `IntersectionObserver` ile opacity/translate; kullanıcı düşük hareket tercihinde hareket kapalı. |
| Ürün sayfasında fotoğraflı büyük alanlar | Fiyatlı kartlar ve konsept görseller | 11 gerçek waffle ürünü, 6 eşleşmiş gerçek fotoğraf, 5 açıkça etiketli temsili ürün görseli. Hiç fiyat yok. |
| İletişim banner ve harita | Dekoratif sahte harita | Gerçek Google Maps embed, doğrulanmış telefon/adres ve mağaza tabelası kırpımı. |

Fotoğraf çözünürlüğü Migros'ta 330×330 ile sınırlı; özellikle hero alanında yüksek çözünürlüklü orijinaller gelirse değiştirilmeli. Mağaza fotoğrafı yalnız tabela kırpımı olarak kullanılıyor. [Kaynak ve izin kaydı](real-media-audit.md). [Playwright doğrulama çıktısı](site-verification.json) her sayfada fiyat, franchise, sepet ve yatay taşma denetimini içerir.

Not: Playwright tam sayfa ekran görüntüsü, üçüncü taraf Google Maps iframe içeriğini boş gösterebiliyor. İframe görünür alana kaydırıldıktan sonra alınan [ayrı harita ekran görüntüsü](map-iframe-check.png) haritanın yüklendiğini gösterir; ayrıca doğrudan Google Maps yol tarifi bağlantısı bulunur.

Sonraki kullanıcı isteğiyle beş eksik ürün görseli imagegen ile üretildi; kart ve ürün pencerelerinde temsili oldukları belirtilir. Gerçek fotoğraf galerisi yalnız doğrulanmış kaynak görsellerden oluşur.

## 30 October 2026 — premium visual revision

| Before | After |
| --- | --- |
| 330×330 product crops enlarged into the hero | 3 original landscape AI hero compositions with manual controls |
| Mixed real and illustrative product photography | 11 consistent portrait still lifes; all labeled “Temsili sunum” |
| Very heavy sans headings and coral cards | Editorial serif typography, cream/cocoa/terracotta palette, lighter product layouts |
| Repeated product pictures in story sections | Separate preparation, chocolate-pour and table photographs |
| Note/quantity-only order details | Existing chocolate/fruit preferences exposed and included in WhatsApp message |
| Filters mounted cards outside the initial observer | Mutation-aware scroll observation and live reduced-motion support |
| External font request, Mac-only test browser | Self-hosted licensed fonts; portable Playwright configuration |

Desktop: [before](premium-evidence/before-desktop-home.jpg) / [after](premium-evidence/after-desktop-home.jpg). Mobile: [before](premium-evidence/before-mobile-home.jpg) / [after](premium-evidence/after-mobile-home.jpg). Hero: [desktop](premium-evidence/after-desktop-hero.jpg), [mobile](premium-evidence/after-mobile-hero.jpg). Verification and remaining deployment requirements are recorded in [premium QA](premium-qa.md).
