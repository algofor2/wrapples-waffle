# Temsili ürün görselleri — imagegen promptları

Üretim: 29 Ekim 2026, built-in `image_gen`, her ürün için ayrı çağrı. Kullanıcının son isteği eksik görsellerin oluşturulup yerleştirilmesiydi. Çıktılar ürünün gerçek Wrapples sunumunu belgelemiyor.

## Mini Bardak Waffle

> Use case: product-mockup. Asset type: square website product card for a waffle cafe. Primary request: a SMALL single-serving clear dessert cup filled with visibly distinct bite-size waffle pieces, sliced strawberries and banana, glossy milk chocolate drizzle, a modest sprinkle of colorful candy bits. Scene/backdrop: warm neutral tabletop, softly blurred creamy beige studio background. Style: premium realistic food photography, appetizing but natural, matching a modern waffle menu. Composition: centered cup filling about 75% of square frame, eye-level three-quarter angle, no cropping of cup. Lighting: soft daylight from left, gentle shadows. Constraints: no logo, no text, no watermark, no branded packaging, no people, no price; this is an illustrative concept and must not reproduce another business's product photo.

## Diğer dört görsel için ortak prompt temeli

> Use case: product-mockup. Asset type: square product card illustration for a waffle cafe website. Style: premium realistic food photography, natural texture, appetizing but plausible. Scene: warm neutral tabletop with softly blurred beige background. Composition: centered three-quarter angle, whole unbranded vessel visible, dessert fills 75% of frame. Lighting: soft daylight from left. No logo, no text, no watermark, no branded packaging, no people, no price. This is an illustrative concept, not a claim to depict the actual Wrapples product.

Her biri yukarıdaki ortak temele aşağıdaki konu cümlesi eklenerek ayrı imagegen çağrısıyla üretildi:

- **Mini Kova:** Subject: SMALL single-serving plain kraft-paper dessert bucket holding golden bite-size waffle pieces, banana slices, strawberries, glossy milk chocolate sauce and a few colorful sugar sprinkles. Clearly distinguish this small bucket from a drinking cup.
- **Oreo White:** Subject: transparent dessert cup with golden waffle chunks, banana and strawberries, abundant white chocolate sauce and crushed dark chocolate sandwich cookie pieces layered on top. Cookie appearance may evoke the menu ingredient, but show no packaging or logos.
- **Brownie Bomb:** Subject: clear dessert cup packed with warm golden waffle chunks, distinct dense brownie cubes, sliced banana and strawberries, with glossy dark chocolate sauce drizzled generously over the top.
- **Lotus Caramel:** Subject: clear dessert cup filled with golden waffle chunks, sliced banana and strawberries, caramel sauce, and crunchy spiced caramel biscuit crumbles; one plain rectangular spiced biscuit on top, no legible embossing or brand text.
