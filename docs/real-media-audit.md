# Wrapples gerçek görsel denetimi

Araştırma ve uygulama: 29 Ekim 2026. Kullanıcı aynı tarihte “Evet, mağaza ve Migros ürün fotoğraflarına izin veriyorum” yanıtıyla işletme adına webde yeniden kullanım izni verdiğini bildirdi. Bu kayıt kullanıcı beyanıdır; dosyaların ilk fotoğrafçısına ait hakların ayrıca belgelendiği anlamına gelmez. Yayına alınan her dosyanın orijinal kaynağı aşağıdadır. İlk sürümde yapay ürün fotoğrafı kullanılmadı. Kullanıcının daha sonraki açık “eksik fotoğrafları sen oluştur koy” talebiyle beş temsili ürün görseli ayrıca üretildi; bunlar gerçek fotoğraf olarak sunulmuyor.

Kaynak menü: [Migros Yemek — Wrapples Waffle](https://www.migros.com.tr/yemek/wrapples-waffle-efeler-guzelhisar-mah-st-2eee8). [Araştırma verisi](video-evidence/migros-media-research.json) ürün adı, alt metin ve görsel URL eşleşmesini saklar. Ürün dosyaları 330×330 kaynaklardan WebP kalitesi 86 ile 30–42 KB aralığına optimize edildi. Büyük ekranda bu çözünürlük sınırına bağlı yumuşaklık görülebilir.

| Ürün | Kaynak görsel | Durum | Yerel dosya / gerekçe |
| --- | --- | --- | --- |
| Klasik Waffle | [Migros](https://images.migrosone.com/yemek/product/02730523/02730523-f449a5.jpeg) | Yayında; kullanıcı izin beyanı | `public/images/products/klasik-waffle.webp` |
| Bowl Waffle | [Migros](https://images.migrosone.com/yemek/product/02730521/02730521-0ef192.png) | Yayında; kullanıcı izin beyanı | `public/images/products/bowl-waffle.webp` |
| Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/02730527/02730527-69628e.png) | Yayında; kullanıcı izin beyanı | `public/images/products/bardak-waffle.webp` |
| Kova Waffle | [Migros](https://images.migrosone.com/yemek/product/03222188/03222188-a7e7a6.png) | Yayında; kullanıcı izin beyanı | `public/images/products/kova-waffle.webp` |
| Süper Kova Waffle | [Migros](https://images.migrosone.com/yemek/product/03720648/03720648-c4cb77.png) | Yayında; kullanıcı izin beyanı | `public/images/products/super-kova-waffle.webp` |
| Fıstık Bombası Special Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/03720856/03720856-42ba91.png) | Yayında; kullanıcı izin beyanı | `public/images/products/fistik-bombasi-special-bardak-waffle.webp` |
| Mini Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/03720647/03720647-69628e.png) | Temsili görsel yayında | Migros görseli Bardak Waffle ile birebir aynı; gerçek mini boy fotoğrafı olarak sunulmadı. |
| Mini Kova Waffle | Kaynakta görsel yok | Temsili görsel yayında | Gerçek ürün görseli bulunamadı. |
| Oreo White Special Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/03720831/03720831-5e44b1.png) | Temsili görsel yayında | Kaynaktaki bardak markası Wrapples olarak doğrulanamadı. |
| Brownie Bomb Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/03720834/03720834-8f0bc0.png) | Temsili görsel yayında | Kaynak fotoğrafında “Waffle Keyfi” markası görünüyor; bu fotoğraf yayınlanmadı. |
| Lotus Caramel Special Bardak Waffle | [Migros](https://images.migrosone.com/yemek/product/03720841/03720841-a938ff.png) | Temsili görsel yayında | Kaynaktaki bardak markası Wrapples olarak doğrulanamadı. |

Mağaza görseli: [Google Maps işletme kaydı](https://maps.app.goo.gl/iCZPwHDjEikDu9Vb7?g_st=iw) üzerinde işletme hesabından yüklenmiş görünen Eylül 2025 tarihli vitrin fotoğrafı. [İnceleme ekranı](video-evidence/maps-photos.jpg) fotoğrafta Wrapples tabelasını, ortak işletme markasını, insanları ve fiyat afişlerini gösterir. Sitede yalnız Wrapples tabelasının bulunduğu kırpım `public/images/wrapples-storefront-sign.webp` olarak kullanılır; diğer marka, kişiler ve fiyat afişleri kırpım dışındadır. Kullanıcı bu mağaza fotoğrafının web kullanımına izin verdiğini bildirdi. Google Maps ekranındaki “Görseller telif hakkına tabi olabilir” uyarısı nedeniyle kullanıcı beyanı ilk fotoğrafçının hak kaydı yerine geçmez; yayın öncesi hak zinciri ayrıca teyit edilmelidir.

Diğer kaynaklar: Tıkla Gelsin sayfası ürün görseli sunmadı ([kanıt](video-evidence/tiklagelsin-media-research.json)). Instagram aramasında resmi hesap güvenilir biçimde doğrulanamadı; bu nedenle hesap bağlantısı veya gönderi kullanılmadı. Beş ürünün temsili görselleri açık etiketle yayınlanır. Başka marka fotoğrafı sitede yok. Gerçek ürün fotoğrafları sağlandığında temsili görseller bunlarla değiştirilmelidir.

## Kullanıcı talebiyle üretilen temsili görseller

Kullanıcı daha sonra eksik fotoğrafların oluşturulup yerleştirilmesini açıkça istedi. Built-in `image_gen` ile her ürün için ayrı `product-mockup` promptu kullanıldı; logosuz, yazısız, nötr arka planlı ve menüde belirtilen malzemeleri içeren ürün tasvirleri üretildi. Çıktılar `cwebp` ile 960×960 WebP olarak optimize edildi. Bunlar **işletmenin gerçek sunumunun kanıtı değildir**; site kartlarında ve ürün penceresinde “TEMSİLİ GÖRSEL” etiketi vardır. Gerçek fotoğraf galerisine alınmadılar.

| Ürün | Yerel dosya | Kısa üretim promptu |
| --- | --- | --- |
| Mini Bardak Waffle | `public/images/products/illustrative-mini-bardak.webp` | Küçük şeffaf kapta waffle, çilek, muz, çikolata |
| Mini Kova Waffle | `public/images/products/illustrative-mini-kova.webp` | Küçük kraft kovada waffle, meyve, çikolata |
| Oreo White Special | `public/images/products/illustrative-oreo-white.webp` | Şeffaf kapta waffle, beyaz çikolata, koyu sandviç bisküvi kırıkları, meyve |
| Brownie Bomb | `public/images/products/illustrative-brownie-bomb.webp` | Şeffaf kapta waffle ve brownie küpleri, çikolata, meyve |
| Lotus Caramel Special | `public/images/products/illustrative-lotus-caramel.webp` | Şeffaf kapta waffle, karamel, baharatlı bisküvi kırıkları, meyve |

Üretim yöntemi: built-in imagegen; tam promptlar [prompt kayıtlarında](illustrative-prompts.md) ve bu oturumdaki beş imagegen çağrısında saklıdır. Kaynak PNG'ler Codex generated_images dizininde; projede optimize WebP kopyaları bulunur.

## 30 Ekim 2026 premium revizyonu

Önceki kaynak dosyaları silinmedi. Menü ve ana sayfadaki 11 varsayılan sunum, yeni ve tutarlı AI fotoğraf setiyle değiştirildi. Altı gerçek Migros fotoğrafı ayrı `/galeri` sayfasında korundu. Beş önceki temsili görsel arşivde duruyor. Yeni tüm ürün görsellerinde “Temsili sunum” etiketi var; mekân konseptleri gerçek işletme olarak sunulmuyor. Yeni dosyalar `public/images/premium/` altında, tam promptlar `premium-image-manifest.json` içinde. Doğrulama ve kısıtlar: `premium-qa.md`.
