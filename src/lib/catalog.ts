export const categories = ['Klasik Waffle', 'Kova Waffle', 'Bardak Waffle', 'Bowl Waffle', 'Özel Seri'] as const;
export type Category = typeof categories[number];
export type ChoiceGroup = { key: string; label: string; values: string[]; max: number };
export type Product = {
  id: string; name: string; category: Category; description: string;
  imageUrl: string | null; imageAlt: string | null;
  available: boolean; featured: boolean; choices: ChoiceGroup[];
};
const basicChoices: ChoiceGroup[] = [
  { key: 'cikolata', label: 'Çikolata tercihi', values: ['Sütlü çikolata', 'Beyaz çikolata', 'Çikolata sosu'], max: 2 },
  { key: 'meyve', label: 'Meyve tercihi', values: ['Muz', 'Çilek', 'Kivi'], max: 3 },
];
export const seedProducts: Product[] = [
  { id:'klasik',name:'Klasik Waffle',category:'Klasik Waffle',description:'Geleneksel waffle lezzeti; tercih ettiğin malzemelerle.',imageUrl:'/images/products/klasik-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki klasik ürün fotoğrafı',available:true,featured:true,choices:basicChoices },
  { id:'bowl',name:'Bowl Waffle',category:'Bowl Waffle',description:'Waffle parçaları ve çeşitli tatlarla dolu bir kase.',imageUrl:'/images/products/bowl-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki bowl ürün fotoğrafı',available:true,featured:true,choices:basicChoices },
  { id:'bardak',name:'Bardak Waffle',category:'Bardak Waffle',description:'Bardakta sunulan waffle keyfi; tercih ettiğin malzemelerle.',imageUrl:'/images/products/bardak-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki bardak ürün fotoğrafı',available:true,featured:true,choices:basicChoices },
  { id:'kova',name:'Kova Waffle',category:'Kova Waffle',description:'Waffle parçaları, çikolata sosu, muz, çilek, kivi ve süslemeler.',imageUrl:'/images/products/kova-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki kova ürün fotoğrafı',available:true,featured:true,choices:basicChoices },
  { id:'mini-bardak',name:'Mini Bardak Waffle',category:'Bardak Waffle',description:'Küçük porsiyon waffle parçaları, çikolata, meyve ve süslemeler.',imageUrl:'/images/products/illustrative-mini-bardak.webp',imageAlt:'Mini Bardak Waffle için yapay zekâ ile üretilmiş temsili görsel',available:true,featured:false,choices:basicChoices },
  { id:'super-kova',name:'Süper Kova Waffle',category:'Kova Waffle',description:'Daha büyük porsiyon, bol çikolata ve meyveyle paylaşmalık waffle.',imageUrl:'/images/products/super-kova-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki super kova ürün fotoğrafı',available:true,featured:false,choices:basicChoices },
  { id:'mini-kova',name:'Mini Kova Waffle',category:'Kova Waffle',description:'Seçeceğin malzemelerle hazırlanan mini kova waffle.',imageUrl:'/images/products/illustrative-mini-kova.webp',imageAlt:'Mini Kova Waffle için yapay zekâ ile üretilmiş temsili görsel',available:true,featured:false,choices:basicChoices },
  { id:'oreo-white',name:'Oreo White Special Bardak Waffle',category:'Özel Seri',description:'Waffle parçaları, muz, çilek, beyaz çikolata sosu ve Oreo kırıkları.',imageUrl:'/images/products/illustrative-oreo-white.webp',imageAlt:'Oreo White Special Bardak Waffle için yapay zekâ ile üretilmiş temsili görsel',available:true,featured:false,choices:[] },
  { id:'brownie-bomb',name:'Brownie Bomb Bardak Waffle',category:'Özel Seri',description:'Waffle parçaları, brownie dilimleri, muz, çilek ve çikolata sosu.',imageUrl:'/images/products/illustrative-brownie-bomb.webp',imageAlt:'Brownie Bomb Bardak Waffle için yapay zekâ ile üretilmiş temsili görsel',available:true,featured:false,choices:[] },
  { id:'lotus-caramel',name:'Lotus Caramel Special Bardak Waffle',category:'Özel Seri',description:'Lotus bisküvisi, karamel sosu, taze meyveler ve çikolata.',imageUrl:'/images/products/illustrative-lotus-caramel.webp',imageAlt:'Lotus Caramel Special Bardak Waffle için yapay zekâ ile üretilmiş temsili görsel',available:true,featured:false,choices:[] },
  { id:'fistik-bombasi',name:'Fıstık Bombası Special Bardak Waffle',category:'Özel Seri',description:'Antep fıstığı, yer fıstığı, bol çikolata ve taze meyve.',imageUrl:'/images/products/fistik-bombasi-special-bardak-waffle.webp',imageAlt:'Migros Yemek Wrapples Waffle menüsündeki fistik bombasi ürün fotoğrafı',available:true,featured:false,choices:[] },
];
export type PublicSettings = { whatsappNumber: string | null; deliveryEnabled: boolean; address: string; phone: string; instagram: string | null; hours: string | null; campaign: string | null };
export const defaultSettings: PublicSettings = { whatsappNumber:'905402560609',deliveryEnabled:false,address:'Güzelhisar, Adnan Menderes Blv. 39 B, Efeler / Aydın',phone:'+90 540 256 06 09',instagram:null,hours:null,campaign:null };
