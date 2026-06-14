MODERN CSS MANTIĞI VE
TAILWIND CSS
Softİto
1.GÜN |FRONTEND
GELIŞTIRME EĞITIMI
Selahaddin ÇİFTÇİ
Eğitmen
GIRIŞ VE ÖNCEKI
DERS ÖZETI
BUGÜNÜN HEDEFLERI & KISA HATIRLATMA
Önceki Derste Neler Öğrendik?
• VS Code kurulumu ve yapılandırması
• Hata ayıklama (debugging) teknikleri
• Geliştirme ortamı hazırlığı
• Temel HTML ve CSS yapısı
Bugün Ne Yapacağız?
• Modern CSS mantığı ve evrimi
• Utility-first yaklaşımı anlamak
• Tailwind CSS ile tanışma
• Pratik uygulama ve örnekler
Selahaddin
ÇİFTÇİ
KLASIK CSS SORUNLARI
CSS'IN EVRIMI VE ZORLUKLARI
Yönetim Zorluğu
CSS büyüdükçe yönetimi giderek
zorlaşır. Binlerce satırlık stil
dosyaları takip edilemez hale
gelir.
Bakım Maliyeti
Yeniden kullanılabilirlik düşük
olduğunda bakım maliyetleri artar
ve küçük değişiklikler büyük
sorunlara yol açar.
Karmaşık Seçiciler
Uzun ve iç içe geçmiş seçiciler,
stil dosyalarını okunaksız hale
getirir ve hata ayıklamayı
zorlaştırır.
Tekrarlayan Kod
Aynı stillerin tekrar tekrar
yazılması tutarsızlıklara ve
gereksiz kod şişmesine neden
olur.
Softİto
AVANTAJLARI
UTILITY-FIRST YAKLAŞIM NEDIR?
Tek Amaçlı Sınıflar
Küçük, tek amaçlı CSS sınıflarının
birleşimiyle karmaşık stiller
kolayca oluşturulur. Her class
yalnızca bir işi yapar.
Hızlı Geliştirme
Stil dosyası küçülür, bileşenler
HTML içinde doğrudan
şekillendirilir. Prototipleme süreci
dramatik biçimde hızlanır.
Yeniden Kullanılabilirlik
Tekrar kullanılabilir ve okunabilir
yapı sayesinde ekip içi iş birliği
kolaylaşır, tutarlı tasarım sistemi
oluşur.
Daha Az Hata
Daha az CSS yazarak daha az
hata yapılır. Çakışan stiller ve
özgüllük savaşları ortadan kalkar.
Softİto
TAILWIND CSS NEDIR VE
NEDEN TERCIH EDILIR?
MODERN PROJELERDE UTILITY-FIRST CSS FRAMEWORK'ÜNÜN GÜCÜ
Utility-First Framework
Tailwind, küçük ve tek
amaçlı CSS sınıflarını
doğrudan HTML üzerinde
kullanmanızı sağlar. CSS
dosyası yazmadan hızlı ve
etkili stiller oluşturabilirsiniz.
Hız ve Özelleştirme
Hızlı prototipleme, yüksek
özelleştirilebilirlik ve büyük
topluluk desteği ile Tailwind,
modern frontend
projelerinde tercih edilen
güçlü bir araçtır.
Selahaddin
ÇİFTÇİ
NASIL ÇALIŞIR?
TAILWIND KURULUM MANTIĞI
HTML'de Direkt Kullanım
CSS sınıfları doğrudan HTML
elementlerine uygulanır. Ayrı bir CSS
dosyası yazmaya gerek kalmadan
class="bg-blue-500 text-white p-4" gibi
utility class'lar kullanılır.
Config Dosyası
tailwind.config.js dosyası ile tema
renkleri, font boyutları, breakpoint'ler ve
eklentiler merkezi olarak yönetilir.
Projeye özel özelleştirmeler buradan
yapılır.
Build: Purge / Tree-shake
Build sürecinde yalnızca kullanılan CSS
sınıfları çıktıya dahil edilir. Kullanılmayan
tüm class'lar kaldırılır; böylece üretim
dosyası çok küçük olur.
Vite ile Entegrasyon
Vite ve diğer modern build araçlarıyla
entegrasyon oldukça kolaydır. PostCSS
eklentisi sayesinde Tailwind, mevcut iş
akışına sorunsuz dahil edilir.
Selahaddin
ÇİFTÇİ
TAIL
WIND
KURULUM
ADIMLARI
VITE
PROJESINE
TAIL
WIND
KURUL
UMU
A
dı
m
1
&
2
P
r
oj
e
o
l
u
ş
t
u
r
m
a: n
p
m
c
r
e
a
t
e
vit
e
@
l
a
t
e
s
t
k
o
m
u
t
u il
e
y
e
ni p
r
oj
e
b
a
ş
l
a
tılır. A
r
dın
d
a
n
Tail
win
d
C
S
S
,
P
o
s
t
C
S
S
v
e
A
u
t
o
p
r
e
fix
e
r
p
a
k
e
t
l
e
ri n
p
m install -D tailwindcss postcss autoprefixer komutuyla kurulur. Adım 4 CSS dosyasına direktifler eklenir: @tailwind base; @tailwind components; @tailwind utilities; Bu üç satır Tailwind'in tüm stillerini projeye dahil eder. Vite ile entegrasyon otomatik çalışır. Adım 3 npx tailwindcss init -p komutu ile tailwind.config.js ve postcss.config.js dosyaları oluşturulur. Config dosyasında content alanına HTML ve JS dosya yolları tanımlanır, böylece purge mekanizması aktif olur. Softİto
TAIL
WIND
DOSYA
VE
CONFIG
YAPISI
ÖNEMLI
DOSYALAR
VE
A
YARLAR
t
ail
win
d.c
o
n
fig.j
s
d
o
s
y
a
sı p
r
oj
e
nin
k
a
l
bidir. Te
m
a
r
e
n
k
l
e
ri,
f
o
n
t
ail
e
si,
s
p
a
cin
g
d
e
ğ
e
r
l
e
ri v
e
e
k
l
e
n
til
e
r
b
u
d
o
s
y
a
d
a
n
y
ö
n
e
tilir. P
u
r
g
e
a
y
a
r
l
a
rı il
e
k
u
l
l
a
nıl
m
a
y
a
n
C
S
S
sınıf
l
a
rı b
uil
d
s
ü
r
e
cin
d
e
o
t
o
m
a
tik
k
a
l
dırılır
,
d
o
s
y
a
b
o
y
u
t
u
k
ü
ç
ü
l
ü
r. s
r
c
/in
d
e
x.c
s
s
d
o
s
y
a
sın
a
ü
ç
Tail
win
d
dir
e
k
tifi e
k
l
e
nir: @tailwind base; temel stilleri, @tailwind components; bileşen stillerini, @tailwind utilities; utility sınıflarını projeye dahil eder. Bu yapı Tailwind'in çalışması için zorunludur. Selahaddin ÇİFTÇİ | Softİto
İLK TAILWIND
CLASS KULLANIMI
UTILITY-FIRST YAKLAŞIMIN PRATIKTE ANLAMI
Basit bir buton örneği:
class="bg-blue-500
text-white
px-4 py-2
rounded"
Her class tek bir görevi yapar. CSS
dosyasına gerek yok!
bg-blue-500 → Mavi arka plan rengi
text-white → Beyaz yazı rengi
px-4 → Yatay iç boşluk (padding)
py-2 → Dikey iç boşluk (padding)
rounded → Yuvarlatılmış köşeler
Utility-first: Küçük, tek amaçlı sınıfları
birleştirerek hızlıca stil oluşturursunuz.
Selahaddin
ÇİFTÇİ
CANLI
DEMO:
YENI
PROJEOLUŞTURMA
DEMO
HAZIRLIK
ADIMLARI
A
dı
m
1:
Proje
O
l
u
ş
t
u
rm
a
Te
r
min
a
l'd
e
y
e
ni Vit
e
p
r
oj
e
si o
l
u
ş
t
u
r
u
n: npm create vite@latest my-app cd my-app npm install Proje türü olarak Vanilla veya React seçin. Adım 3: Config Düzenleme tailwind.config.js dosyasını açın, conte
n
t
a
l
a
nın
a
d
o
s
y
a
y
o
l
l
a
rını e
k
l
e
yin. src/index.css'e @tailwind base
;
@
t
ail
win
d
c
o
m
p
o
n
e
n
t
s
;
@
t
ail
win
d
u
tilitie
s
;
dir
e
k
tif
l
e
rini y
a
zın. Adım 2: Tailwind Kurulumu Tailwind ve bağımlılıklarını yükleyin: npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p Config dosyası otomatik oluşturulur. Softİto
CANLI
DEMO:
TAIL
WIND
KURULUMUVE
İLK
COMPONENT
ADIM
ADIM
KURUL
UM
VE
KOD
YAZIMI tailwind.config.js content: ['./index.html', './src/**/*. {js,ts,jsx,tsx}'] ile dosya yolları tanımlanır. Theme extend ile özel renkler ve fontlar eklenir. Plugins dizisine ek modüller yüklenir. CS
S
D
ire
kti
fl
e
ri
s
r
c
/in
d
e
x.c
s
s
d
o
s
y
a
sın
a
@
t
ail
win
d
b
a
s
e
;
@
t
ail
win
d
c
o
m
p
o
n
e
n
t
s
;
@
t
ail
win
d
u
tilitie
s
;
dir
e
k
tif
l
e
ri e
k
l
e
nir. B
u
ü
ç
s
a
tır
Tail
win
d'in
t
ü
m
sınıf
l
a
rını p
r
oj
e
y
e
d
a
hil
e
d
e
r. Na
vb
a
r
C
o
mp
o
n
e
n
t
c
l
a
s
s
=
"
f
l
e
x
j
u
s
tif
y

- b
  e
  t
  w
  e
  e
  n it
  e
  m
  s
- c
  e
  n
  t
  e
  r
  b
  g
- g
  r
  a
  y
- 9
  0
  0
  t
  e
  x
  t
- w
  hit
  e
  p
  x
- 6
  p
  y
- 4
  " il
  e
  t
  e
  m
  e
  l
  n
  a
  v
  b
  a
  r
  o
  l
  u
  ş
  t
  u
  r
  u
  l
  u
  r. H
  o
  v
  e
  r
  e
  f
  e
  k
  ti: hover:text-blue-400 transition-colors duration-200 ile eklenir. Selahaddin ÇİFTÇİ | Softİto
  CANLI
  DEMO:
  UTILITY
  CLASS
  KULLANIMI
  UTILITY
  CLASS
  MANTIĞI GÖSTERIMI
  Sp
  a
  c
  in
  g
  &
  Re
  n
  k
  m
- 4
  →
  m
  a
  r
  gin: 1
  r
  e
  m
  p
- 6
  →
  p
  a
  d
  din
  g: 1.5
  r
  e
  m
  b
  g
- b
  l
  u
  e
- 5
  0
  0
  →
  a
  r
  k
  a
  p
  l
  a
  n
  r
  e
  n
  gi text-white → beyaz metin mt-2, mb-4 → üst/alt boşluk px-3, py-2 → yatay/dikey paddin
  g
  Hızl
  ı
  S
  til
  A
  va
  n
  tajı
  Te
  k
  s
  a
  tır
  H
  T
  M
  L'd
  e
  o
  n
  l
  a
  r
  c
  a
  s
  til
  u
  y
  g
  u
  l
  a
  nır. CSS dosyası yazmaya gerek kalmaz. Değişiklikler anında görünür, geliştirme süreci çok daha hızlı ve verimli hale gelir. Typography & Font text-lg → büyük metin font-bold → kalın yazı text-center → ortala text-gray-700 → gri ton leading-relaxed → satır aralığı tracking-wide → harf aralığı Selahaddin ÇİFTÇİ | Softİto
  ÖĞLEDEN
  SONRA
  OTURUMU
  TAILWIND CSS TEMELLERI VE UYGULAMA
  Typography · Spacing · Layout · Backgrounds · Borders · Display · Position · Hover · Transition
  Uygulama: Tailwind ile Küçük Landing Page Oluşturma
  Selahaddin
  ÇİFTÇİ |
  Softİto
  TAILWIND CSS
  TYPOGRAPHY TEMELLERI
  TAILWIND ILE METIN STILLERI
  Text Size
  text-xs (12px), text-sm (14px), textbase (16px), text-lg (18px), text-xl
  (20px), text-2xl (24px), text-4xl
  (36px)
  Font Weight
  font-thin, font-light, font-normal,
  font-medium, font-semibold, fontbold, font-extrabold, font-black
  Text Alignment
  text-left, text-center, text-right,
  text-justify — Örnek: Başlık
  Renk Kullanımı
  text-gray-700, text-blue-500, textred-600, text-white, text-opacity75 — Örnek: class="text-gray-700
  text-sm font-medium"
  Selahaddin
  ÇİFTÇİ
  BOŞLUK
  YÖNETIMI
  SPACING: MARGIN, PADDING,
  GAP
  Ma
  rg
  in
  Ku
  l
  l
  a
  n
  ı
  m
  ı
  m
- 4
  →
  t
  ü
  m
  y
  ö
  n
  l
  e
  r
  d
  e
  m
  a
  r
  gin
  m
  t
- 2
  →
  s
  a
  d
  e
  c
  e
  ü
  s
  t
  t
  e
  m
  a
  r
  gin
  m
  x
- a
  u
  t
  o
  →
  y
  a
  t
  a
  y
  o
  r
  t
  a
  l
  a
  m
  a
  m
  b
- 6
  →
  a
  l
  t
  t
  a
  b
  o
  ş
  l
  u
  k
  m
  l
- 3
  ,
  m
  r3
  →
  s
  o
  l
  /
  s
  a
  ğ
  m
  a
  r
  gin
  G
  ap
  :
  Fl
  ex
  &
  G
  rid
  B
  o
  ş
  l
  uğ
  u
  g
  a
  p
- 4
  →
  f
  l
  e
  x/
  g
  rid
  a
  r
  a
  sı b
  o
  ş
  l
  u
  k
  g
  a
  p
- x
- 6
  →
  y
  a
  t
  a
  y
  b
  o
  ş
  l
  u
  k
  g
  a
  p
- y
- 2
  →
  dik
  e
  y
  b
  o
  ş
  l
  u
  k
  s
  p
  a
  c
  e
- x
- 4
  →
  f
  l
  e
  x
  c
  hil
  d
  a
  r
  a
  sı space-y-3 → dikey child ara
  sı Padding Kullanımı p-6 → tüm yönlerde padding px-3 → yatay (sol+sağ) py-4 → dikey (üst+alt) pt-2 → sadece üstte pl-5, pr-5 → sol/sağ padding
  E
  ğit
  m
  e
  n: Selahaddin ÇİFTÇİ | Softİto
  WIDTH,
  HEIGHT
  &
  CONTAINER
  LA
  YOUT
  BASICS
  Width
  S
  ı
  n
  ı
  fl
  a
  rı
  w
- f
  u
  l
  l: %
  1
  0
  0
  g
  e
  niş
  lik
  w
- 1
  /
  2: %
  5
  0
  g
  e
  niş
  lik
  w
- 1
  /
  3: %
  3
  3
  g
  e
  niş
  lik
  w
- 6
  4: s
  a
  bit
  1
  6
  r
  e
  m
  g
  e
  niş
  lik
  w
- s
  c
  r
  e
  e
  n: vie
  w
  p
  o
  r
  t
  g
  e
  niş
  liği Container & Max-Width container: responsive genişlik
  sınıfı mx-auto: yatay ortalama max-w-sm / max-w-lg / max-w-7xl max-w-full: maksimum genişlik sınırı Height Sınıfları h-16: sabit 4rem yükseklik h-screen: tam ekran yüksekliği min-h-screen: minimum tam ekran h-full: ebeveyn kadar yükseklik h-auto: içeriğe göre otomatik
  S
  e
  l
  a
  h
  a
  d
  din
  ÇİF
  TÇİ
  BACKGROUND
  VE
  BORDER
  ARKA
  PLAN
  VE
  ÇERÇEVE
  STILLERI
  b
  g
- r
  e
  d
- 5
  0
  0
  →
  Kır
  mızı a
  r
  k
  a
  p
  l
  a
  n
  b
  g
- b
  l
  u
  e
- 2
  0
  0
  →
  A
  çık
  m
  a
  vi a
  r
  k
  a
  p
  l
  a
  n
  b
  g
- o
  p
  a
  cit
  y
- 5
  0
  →
  %
  5
  0
  ş
  e
  f
  f
  a
  f
  lık
  b
  o
  r
  d
  e
  r
  → İn
  c
  e
  k
  e
  n
  a
  r
  lık
  e
  k
  l
  e
  r
  b
  o
  r
  d
  e
  rg
  r
  a
  y
- 3
  0
  0
  →
  G
  ri k
  e
  n
  a
  r
  lık
  r
  e
  n
  gi border-2 → 2px kalınlık
  r
  o
  u
  n
  d
  e
  d
  →
  H
  a
  fif
  y
  u
  v
  a
  r
  l
  a
  k
  k
  ö
  ş
  e
  r
  o
  u
  n
  d
  e
  d
- l
  g
  →
  B
  ü
  y
  ü
  k
  y
  u
  v
  a
  r
  l
  a
  k
  k
  ö
  ş
  e
  r
  o
  u
  n
  d
  e
  d
- f
  u
  l
  l
  →
  Ta
  m
  y
  u
  v
  a
  r
  l
  a
  k
  (
  pil
  l
  )
  s
  h
  a
  d
  o
  w
- m
  d
  →
  O
  r
  t
  a
  g
  ö
  l
  g
  e
  e
  f
  e
  k
  ti shadow-lg → Büyük gölge efekti shadow-xl → Güçlü gölge efekti Selahaddin ÇİFTÇİ | Softİto
  DISPLAY
  VE
  POSITION
  YERLEŞIM
  VE
  GÖRÜNÜRL
  ÜK
  Dis
  p
  l
  a
  y
  c
  l
  a
  s
  s'l
  a
  rı il
  e
  e
  l
  e
  m
  a
  n
  l
  a
  rın
  n
  a
  sıl
  g
  ö
  r
  ü
  n
  t
  ü
  l
  e
  n
  e
  c
  e
  ğini k
  o
  n
  t
  r
  o
  l
  e
  din: • block → tam genişlik blok • inline → satır içi eleman • flex → esnek kutu düzeni • grid → ızgara düzeni • hidden → görünmez yap Örnek: P
  o
  sitio
  n
  c
  l
  a
  s
  s'l
  a
  rı il
  e
  e
  l
  e
  m
  a
  n
  l
  a
  rın
  k
  o
  n
  u
  m
  u
  n
  u
  b
  e
  lir
  l
  e
  yin: • relative
  →
  n
  o
  r
  m
  a
  l
  a
  kış
  t
  a
  ,
  r
  e
  f
  e
  r
  a
  n
  s
  n
  o
  k
  t
  a
  •
  a
  b
  s
  o
  l
  u
  t
  e
  →
  e
  n
  y
  a
  kın
  r
  e
  l
  a
  tiv
  e'e
  g
  ö
  r
  e
  •
  fix
  e
  d
  →
  e
  k
  r
  a
  n
  a
  s
  a
  bit
  (
  n
  a
  v
  b
  a
  r için
  )
  •
  s
  tic
  k
  y
  →
  k
  a
  y
  dır
  m
  a
  d
  a
  s
  a
  bit
  k
  a
  lır
  S
  e
  Ö
  r
  n
  e
  k: lahaddin
  ÇİF
  TÇİ | Softİto
  HOVER & TRANSITION
  EFEKTLERI
  ETKILEŞIMLI STILLER ILE DINAMIK KULLANICI DENEYIMI
  Hover Efektleri
  hover: prefix ile fareyle üzerine
  gelince stil değiştirilir.
  hover:bg-blue-600
  hover:text-white
  hover:scale-105
  hover:shadow-xl
  Her utility class'ın başına hover:
  eklemek yeterli!
  Transition Efektleri
  Geçiş animasyonları için
  transition class'ları kullanılır.
  transition-colors → renk geçişi
  transition-all → tüm özellikler
  duration-300 → 300ms süre
  ease-in-out → yumuşak geçiş
  Örnek: class="bg-blue-500
  hover:bg-blue-700 transitioncolors duration-300"
  Selahaddin
  ÇİFTÇİ
  MINI GÖREV: KART
  TASARLA!
  🎯ÖĞRENCI ETKILEŞIMI — TAILWIND ILE KART OLUŞTURMA
  📌 Görev Talimatları:
  1.Yeni bir div oluşturun
  2.bg-white ve shadow-lg ekleyin
  3.p-6 ile iç boşluk verin
  4.rounded-2xl ile köşeleri yuvarlayın
  5.Hover efekti: hover:shadow-2xl
  6.transition duration-300 ekleyin
  Süre: 10 dakika ⏱️
  💻 Örnek Kod:
  Selahaddin
  ÇİFTÇİ |
  Softİto
  DOĞRU VE YANLIŞ
  KULLANIM ÖRNEKLERI
  ❌YANLIŞ VS✅DOĞRU KULLANIM
  ❌ YANLIŞ — Uzun, Tekrarlayan, Okunaksız:
  ⚠️ m-4 yerine mt-4 mb-4 ml-4 mr-4 yazmak gereksiz
  tekrardır.
  ✅ DOĞRU — Temiz, Kısa, Okunabilir:
  💡 Kısa ve anlamlı class'lar kullanın. Tailwind'de m-4
  zaten dört yönü kapsar. Okunabilirlik her zaman
  önce gelir!
  Eğitmen:
  Selahaddin
  ÇİFTÇİ |
  Softİto
  UYGULAMA
  BÖLÜMÜ
  KÜÇÜK LANDING PAGE OLUŞTURUYORUZ
  Bu bölümde Tailwind CSS'i gerçek bir projede kullanacağız. Navbar, Hero Section ve Kart yapısını
  adım adım oluşturarak utility-first yaklaşımın gücünü pratikte göreceğiz. Amaç: Tailwind mantığını
  gerçek bir projede deneyimlemek.
  Selahaddin
  ÇİFTÇİ
  NAVBAR TASARIMI
  TAILWIND ILE FLEX NAVBAR — KOD ÖRNEĞI VE AÇIKLAMA
  Kullanılan Utility Class'lar:
  • flex + justify-between: Öğeleri yatayda iki
  uca yaslar
  • items-center: Dikey hizalama sağlar
  • px-6 py-4: Yatay ve dikey iç boşluk
  • bg-gray-900: Koyu arka plan rengi
  • gap-6: Nav linkleri arası boşluk
  • hover:text-blue-400: Hover'da renk
  değişimi
  • transition-colors duration-300: Yumuşak
  geçiş efekti
  📌 Responsive Not: md:flex hidden ile
  mobilde gizleyip masaüstünde
  gösterebilirsiniz.
  Softİto
  HERO
  SECTION
  BAŞLIK,
  BUTON
  VE
  TYPOGRAPHY
  ILE
  SPACING
  KULLANIMI
  🎯
  K
  u
  l
  l
  a
  nıl
  a
  n
  C
  l
  a
  s
  s'l
  a
  r: • bg-gradient-to-r: Yata
  y
  g
  r
  a
  die
  n
  t
  a
  r
  k
  a
  p
  l
  a
  n
  •
  min
- h
- s
  c
  r
  e
  e
  n: Ta
  m
  e
  k
  r
  a
  n
  y
  ü
  k
  s
  e
  k
  liği • text-5xl font-bold: Büyük, kalın başlık • mb-4 / mb-8: Alt boşluk (margin-bott
  o
  m
  )
  •
  m
  a
  x
- w
- x
  l
  m
  x
- a
  u
  t
  o: O
  r
  t
  a
  l
  a
  n
  mış
  m
  a
  x
  g
  e
  niş
  lik
  •
  r
  o
  u
  n
  d
  e
  d
- f
  u
  l
  l: Ta
  m
  y
  u
  v
  a
  r
  l
  a
  k
  k
  ö
  ş
  e
  •
  h
  o
  v
  e
  r:s
  c
  a
  l
  e
- 1
  0
  5: H
  o
  v
  e
  r'd
  a
  b
  ü
  y
  ü
  m
  e
  e
  f
  e
  k
  ti • transition-all duration-300: Akıcı animasyon
  S
  e
  l
  a
  h
  a
  d
  din
  ÇİF
  TÇİ | Softİto
  KART YAPISI
  BASIT KART COMPONENT'I
  🎨 Temel Utility Class'lar:
  • bg-white → arka plan rengi
  • rounded-xl → köşe yuvarlama
  • shadow-lg → gölge efekti
  • p-6 → iç boşluk (padding)
  • hover:shadow-2xl → hover'da güçlü
  gölge
  • transition-all duration-300 →
  yumuşak geçiş animasyonu
  Selahaddin
  ÇİFTÇİ |
  Softİto
  AKILLI ÖĞRENME
  ÖĞRETIM YAKLAŞIMI VE İPUÇLARI
  Ezberleme Değil, Anlama
  Tailwind class'larını ezberlemek
  zorunda değilsiniz. Mantığı anlayın: bg-,
  text-, p-, m- gibi prefix'lerin ne anlama
  geldiğini kavrayın, gerisini öğrenirsiniz.
  Google Kullanmak Normaldir
  Profesyonel geliştiriciler bile Tailwind
  dokümantasyonuna bakar. Doğru class'ı
  aramak bir zayıflık değil, verimli
  çalışmanın göstergesidir.
  Temiz Class Kullanımı
  Çok uzun ve karmaşık class zincirleri
  okunabilirliği düşürür. Mantıklı
  gruplamalar yapın, gerektiğinde
  @apply ile bileşen sınıfları oluşturun.
  Sık Yapılan Hatalar
  Inline style yerine Tailwind class
  kullanmayı ihmal etmek, purge ayarını
  yanlış yapmak ve responsive prefix'leri
  (sm:, md:, lg:) karıştırmak en yaygın
  hatalardır.
  Softİto
  BUGÜN NELER
  ÖĞRENDIK?
  ÖZET VE SONUÇLAR
  CSS Evrimi
  CSS'in büyümesi, utility-first
  yaklaşımın neden ortaya
  çıktığını ve klasik yöntemlerin
  sınırlarını öğrendik.
  Tailwind Kurulumu
  Vite projesiyle Tailwind CSS
  kurulumu, config dosyası ve
  direktiflerin nasıl
  ekleneceğini öğrendik.
  Utility Class'lar
  Typography, spacing, layout,
  background, border, hover
  ve transition utility class'larını
  uygulamalı gördük.
  Mini Landing Page
  Navbar, hero section ve kart
  yapısıyla gerçek bir proje
  deneyimi kazandık.
  Arowwai
  Industries
  TEŞEKKÜRLER!
  SORULARINIZ
  VARSA
  ALABILIRIZ Frontend Geliştirme Eğitimi - Gün 2: Modern CSS Mantığı ve Tailwind CSS başarıyla tamamlandı. Öğrendiklerinizi projelerinizde uygulayın ve geliştirmeye devam edin! S
  e
  l
  a
  h
  a
  d
  din
  ÇİF
  TÇİ Softİto Eğitim Merk
  e
  zi Frontend Geliştirme Eğit
  m
  e
  ni Gün 2 - Modern CSS & Tailwin
  d
  C
  S
  S
  S
  o
  f
  tİt
  o
