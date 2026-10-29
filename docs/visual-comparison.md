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
