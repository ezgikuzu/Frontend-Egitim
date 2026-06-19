export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max 256 GB Titanyum",
    price: 76999,
    category: "Telefon",
    rating: 4.8,
    ratingCount: 124,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Titanyum tasarımı, A17 Pro çipi ve gelişmiş kamera sistemiyle en güçlü iPhone."
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 512 GB Gri",
    price: 68499,
    category: "Telefon",
    rating: 4.7,
    ratingCount: 89,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Galaxy AI entegrasyonu, 200 MP kamera ve S-Pen desteği ile sınırları zorlayın."
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Gürültü Engelleyici Kulaklık",
    price: 11999,
    category: "Aksesuar",
    rating: 4.9,
    ratingCount: 231,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Sektör lideri gürültü engelleme teknolojisi ve olağanüstü ses kalitesi."
  },
  {
    id: 4,
    title: "Apple MacBook Air M3 8GB 256GB SSD 13.6\"",
    price: 39499,
    category: "Bilgisayar",
    rating: 4.6,
    ratingCount: 45,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Süper güç M3 çip ile ultra ince, taşınabilir ve gün boyu süren pil ömrü."
  },
  {
    id: 5,
    title: "Nike Air Max Pulse Erkek Spor Ayakkabı",
    price: 4999,
    category: "Moda",
    rating: 4.4,
    ratingCount: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Sokak modasından ilham alan, üstün yastıklama ve konfor sunan Air Max."
  },
  {
    id: 6,
    title: "Stanley Quencher H2.0 Termos 1.18 Litre",
    price: 2499,
    category: "Ev & Yaşam",
    rating: 4.7,
    ratingCount: 412,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "İçeceklerinizi saatlerce soğuk tutan, pipetli ve ergonomik kulplu termos."
  },
  {
    id: 7,
    title: "Xiaomi Redmi Watch 4 Akıllı Saat Gümüş",
    price: 3299,
    category: "Aksesuar",
    rating: 4.3,
    ratingCount: 56,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Geniş AMOLED ekranı, dahili GPS'i ve 15 güne varan pil ömrü ile akıllı takip."
  },
  {
    id: 8,
    title: "Logitech MX Master 3S Kablosuz Ergonomik Mouse",
    price: 4199,
    category: "Bilgisayar",
    rating: 4.8,
    ratingCount: 178,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Sessiz tıklama, 8K DPI hassasiyet ve her yüzeyde çalışan gelişmiş ergonomik mouse."
  }
];

export const MOCK_CATEGORIES = ["Tümü", "Telefon", "Bilgisayar", "Aksesuar", "Moda", "Ev & Yaşam"];

export const ABOUT_DATA = {
  subtitle: "Biz Kimiz?",
  title: "n11clone Hakkında",
  text1: "n11clone, Türkiye'nin lider e-ticaret platformlarından n11'den ilham alarak geliştirilmiş, alıcılar ile satıcıları buluşturan yenilikçi ve güvenilir bir alışveriş pazaryeri prototipidir.",
  text2: "Amacımız, kullanıcılara en yeni teknolojileri ve şık tasarım standartlarını sunarak kusursuz bir e-ticaret deneyimi sağlamaktır. Modern bileşen mimarimiz ve optimize edilmiş veri yönetimi modellerimiz ile geleceğin alışveriş altyapısını bugünden inşa ediyoruz.",
  values: [
    { title: "Güvenilirlik", desc: "Ödeme ve veri güvenliğinde en üst düzey standartları benimsiyoruz." },
    { title: "Yenilikçilik", desc: "Modern web teknolojilerini takip ederek sürekli gelişim sağlıyoruz." },
    { title: "Kullanıcı Odaklılık", desc: "Kullanıcılarımızın geri bildirimlerini dinliyor ve önemsiyoruz." }
  ]
};

export const FAQ_DATA = [
  {
    q: "Siparişim ne zaman kargolanır?",
    a: "Satıcılarımız siparişlerinizi genellikle 24 saat içerisinde kargoya teslim eder. Kargo takip bilgileri e-posta adresinize gönderilir."
  },
  {
    q: "İade sürecini nasıl başlatırım?",
    a: "Hesabım sayfasındaki Siparişlerim alanından ilgili ürünü seçerek 'İade Talebi Oluştur' butonuna basabilir ve ücretsiz kargo kodunuzu alabilirsiniz."
  },
  {
    q: "Ödeme seçenekleri nelerdir?",
    a: "Tüm kredi kartları, banka kartları ve BKM Express aracılığıyla güvenli ödeme yapabilirsiniz. Taksit seçenekleri ürün sayfasında gösterilmektedir."
  }
];
