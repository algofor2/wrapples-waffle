# Referans sitelerin reverse engineering raporu

**İnceleme tarihi:** 29 Ekim 2026. **Araç:** REA 6.5.0 (`rea-agents`) Playwright senaryo yakalama ve CDP `inspect-web-page`; ek olarak Playwright DOM ve `getComputedStyle()` ölçümü. REA MCP, Codex yapılandırmasında kayıtlıydı fakat bu oturumun araç listesine bağlanmamıştı. Bu nedenle aynı REA paketinin CLI komutları **gerçekten çalıştırıldı**. Komut girdileri, ham Evidence JSON ve ekran görüntüleri [kanıt klasöründe](reverse-evidence/) bulunur. Ölçümler `measure.mjs` ile alındı.

## Kanıt zinciri ve sınırlar

| Site | REA işlemi ve Evidence ID | Görüntüler | Ölçüm dosyaları |
| --- | --- | --- | --- |
| Sweet Waffle | `capture-browser-scenario`: masaüstü `ev_813071dc97423a864b149acb1e20cfb81e7f81d33905455ead34d289e5534aa6`; tablet/mobil kayıtları aynı klasörde | [1440](reverse-evidence/sweet-desktop.png), [768](reverse-evidence/sweet-tablet.png), [375](reverse-evidence/sweet-mobile.png) | [1440](reverse-evidence/sweet-desktop-measure.json), [768](reverse-evidence/sweet-tablet-measure.json), [375](reverse-evidence/sweet-mobile-measure.json) |
| The Belgian Waffle Co | `list-browser-targets` ardından `inspect-web-page`: `ev_dffaedfa7b65590d87bb0bc9bbd9f030d72e7bb02550551b3d49cb776bb4e8c7`; [ham REA kanıtı](reverse-evidence/belgian-rea-inspect.json) | [1440](reverse-evidence/belgian-desktop-playwright.png), [768](reverse-evidence/belgian-tablet-playwright.png), [375](reverse-evidence/belgian-mobile-playwright.png) | [1440](reverse-evidence/belgian-desktop-measure.json), [768](reverse-evidence/belgian-tablet-measure.json), [375](reverse-evidence/belgian-mobile-measure.json) |
| Aberfa | `capture-browser-scenario`: masaüstü `ev_e9ea06c49a99968254422a0394bb0fcafddbf81163f891c167116551407622cb`; tablet/mobil kayıtları aynı klasörde | [1440](reverse-evidence/aberfa-desktop.png), [768](reverse-evidence/aberfa-tablet.png), [375](reverse-evidence/aberfa-mobile.png) | [1440](reverse-evidence/aberfa-desktop-measure.json), [768](reverse-evidence/aberfa-tablet-measure.json), [375](reverse-evidence/aberfa-mobile-measure.json) |

Belgian sitesinde REA'nın owned-browser ilk gezinmesi üç denemede 35 saniye içinde tamamlanmadı. Playwright ile `domcontentloaded` sonrasında açık CDP hedefi REA `inspect-web-page` ile başarıyla incelendi. Bu REA kaydı pasiftir ve açılmadan önceki ağı kapsamaz. Belgian hero videosu headless Chromium'da siyah göründü; bu görüntü, canlı sitedeki video kompozisyonunu tam temsil etmez. Ölçümden çıkarılamayan easing, parallax veya ürün kişiselleştirme davranışları varmış gibi işaretlenmedi.

## 1. Sweet Waffle

**Hiyerarşi ve akış:** `header > logo + navigation + mağaza bağlantısı + dil seçimi`; `main > tam ekran hero/carousel > tanıtım > ürün çeşitleri > diğer tanıtım alanları`; footer. İlk ekrandaki “Daha Fazla Bilgi” çağrısı keşfe yönlendiriyor. Ürünler için ayrı `/menu` yolu var. Ürün detayından siparişe giden bir akış ana sayfa kanıtından doğrulanmadı. Masaüstü navigasyonda Anasayfa, Ürünler, Hakkımızda, Franchising, İletişim; mobilde navigasyon dar alana uyarlanıyor.

**Ölçümler:** 1440×900'de sabit header **104 px**, nav aralığı **32 px**, hero **900 px**, h1 **72/90 px**. 768'de h1 **60 px**; 375'te header **88 px**, h1 **36 px**. Gövde Roboto, **16/24 px**, metin `rgb(42,26,16)`, zemin `rgb(251,247,240)`. Hero fotoğrafı tüm ekranı kaplıyor; metin solda x≈104 px, koyu overlay üzerinde açık renk. Carousel okları ve ilerleme çizgileri görünür. Çerez paneli ekranın altını örter; mobil ilk ekran alanını etkiler. `/_next/static/` dosyaları, Next.js ve React kullanımına güçlü işarettir. Hero görselleri Cloudinary/Next image yoluyla geliyor.

**Etkileşim/hareket:** Carousel okları, dil seçimi ve ürünler bağlantısı DOM'da mevcut. İncelenen hero kapsayıcısının computed `animation` değeri `none`; tüm sayfada parallax kanıtı yok. Bu nedenle tasarımda yalnızca ölçülü, kullanıcı tercihine saygılı hareket fikri alınacak. Fotoğraf, marka işareti veya carousel kompozisyonu kopyalanmayacak.

## 2. The Belgian Waffle Co

**Hiyerarşi ve akış:** Sabit yuvarlatılmış nav; video/banner hero; çok büyük tipografili hikâye bölümü; kategori vitrini/carousel; üyelik, etkinlik, mağaza bulucu ve footer. Ana menü `/menu` yoluna; mağaza çağrısı `/store-locator` yoluna gidiyor. Site, siparişten çok marka ve mağaza keşfi üzerine kurulu. Ana sayfada sepet veya kişiselleştirme doğrulanmadı.

**Ölçümler:** 1440'te nav **50 px** yüksekliğinde, y≈60 px; hero **900 px**. Gövde Familjen Grotesk **16/24 px**, yazı `rgb(77,45,30)`, krem zemin `rgb(255,252,213)`. Hikâye başlığı BritanniaCG Bold **115.2/138.24 px** ve turuncu `rgb(236,89,52)`; sonraki başlıklar **90 px**. `/_next/static/` ve `turbopack` chunk adları Next.js/Turbopack'e işaret eder. Hero kapsayıcısında computed `transform 0.1s ease-out, opacity 0.1s ease-out`; bazı başlıklarda opacity/transform geçişi var. Kaydırma tetiklenmesini ve gerçek parallax derinliğini bu kısa pasif yakalama kanıtlamıyor.

**Responsive sınırı:** 768 ve 375 ölçümünde hero medyasının ilk çocuk kutusu 0 px, mobil ilk ekran görüntüsü siyah/video yüklenmemiş halde; bu yüzden mobil hero yerleşimi hakkında kesin görsel hüküm verilmedi. Mobilde dairesel menü tetikleyicisi görünür. Sayfa yükseklikleri sırasıyla **9421 / 9516 / 7515 px**. Video ağırlıklı hero performans ve düşürülmüş hareket açısından dikkat gerektiriyor.

## 3. Aberfa

**Hiyerarşi ve akış:** Sabit `nav`; gradient hero ve tek “Menüyü Keşfet” butonu; menü dil seçimi; dört öne çıkan kategori kartı; hikâye; adres/telefon/Instagram iletişimi; footer. Menü iki ayrı HTML sayfasına bağlanıyor (`aberfa-landing-turkish.html`, `aberfa-landing-english.html`); telefon `tel:` bağlantısı. Ana sayfada sepet veya WhatsApp akışı yok. Sipariş yaklaşımından alınabilecek fikir, doğrudan ve görünür eylem çağrısıdır.

**Ölçümler:** 1440'te nav **87 px**, `padding: 24px 72px`, hero **900 px**, h1 Georgia **80 px**, h2 **48 px**. 768'de nav **62 px**, h1 **40 px**; 375'te h1 **32 px**, nav **62 px**. Gövde Georgia **16 px**, zemin `rgb(253,245,247)`, vurgu magenta. Hero gradientinde `gradientShift` **15 s infinite**; h1 `slideDown` **1 s ease-out**; CTA geçişi **0.3 s**. Script envanterinde yalnız Cloudflare Insights beacon görüldü; ana etkileşim vanilla HTML/CSS/JS ile uyumlu. Scroll parallax kanıtı yok.

**Erişilebilirlik ve performans:** Menü dili linklerle anlaşılır; CTA butonunun hedefi menü bölümü. Mobil metin küçülüyor, içerik tek sütuna iniyor. Tam ekran gradient, ağır hero videosuna göre daha az ağ isteği gerektiriyor. Doğrudan ürün seçimi ve özelleştirme yok.

## Wrapples için uygulanan özgün kararlar

1. **Keşif ve fotoğraf ölçeği:** Sweet Waffle'ın açık menü yolunu ve tam ekran fotoğraf hero ritmini, Wrapples'ın kendi waffle menüsüyle yeniden kurduk. [Kullanıcı videosunun kare analizi](reference-video-analysis.md) ayrıca iki sütunlu tanıtım, görsel mozaik ve dairesel ürün vitrini sırasını belirledi.
2. **Tipografi ve düzen:** Belgian Waffle'ın büyük başlık/boşluk ölçeği, farklı bir Manrope/Georgia kombinasyonu ve açık krem–mercan–kahve paletiyle yorumlandı. Üç referansın kaynak kodu, marka işaretleri ve görselleri taşınmadı.
3. **İletişim akışı:** Aberfa'daki belirgin tek eylem fikri, kullanıcı isteğine uygun olarak her ürün için doğrudan WhatsApp sipariş talebiyle uygulandı. Kullanıcı sepeti istemedi. Adet ve not mesajda yer alır; fiyat gösterilmez.
4. **Hareket:** IntersectionObserver ile bölüm açılmaları, hero için düşük genlikli kaydırma hareketi, hover geçişleri ve `prefers-reduced-motion` desteği eklendi. Bu davranışlar videodan esinlenen özgün uygulama kararlarıdır; referans sitenin kesin easing değerleri olduğu iddia edilmez.
5. **Gerçek içerik:** Kullanıcının 29 Ekim 2026 tarihli web kullanım izni beyanından sonra Migros Wrapples menüsündeki altı ürün fotoğrafı ve Google Maps işletme tabelası kırpımı kullanıldı. Kaynağı ve sınırları [gerçek medya denetiminde](real-media-audit.md). Eşleşmesi belirsiz veya başka marka taşıyan görseller yayınlanmadı.
