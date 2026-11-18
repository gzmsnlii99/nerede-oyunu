# Nerede? — Okul Öncesi Dil ve Konuşma Oyunu

Türkçe **“nerede / nereye gitmeli?”** sorusunu çalıştıran, sesli ve tıklanabilir bir şehir oyunu.
Bir karakter seçilir, karakter ihtiyacını sesli olarak söyler, doğru yere gidilir ve varışta
3 resimli seçenekle “... nerede?” sorusu sorulur.

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından tarayıcıda **http://localhost:3000** adresini açın.

> Windows PowerShell’de `npm` komutu engellenirse `npm.cmd run dev` kullanın.

Üretim derlemesi için:

```bash
npm run build
npm start
```

## Nasıl oynanır?

1. **Karakter seç** — Ece (çocuk), Elif (anne), Zeynep (abla), Ahmet (baba),
   Mehmet (dede) veya Fatma (nine). Karttaki isim alanına kendi yazdığınız ismi
   girebilirsiniz; isim oyun boyunca konuşmalarda ve sorularda kullanılır.
   “Sesi dene” düğmesiyle sesi kontrol edebilirsiniz.
2. **İhtiyacı dinle** — Karakter örneğin “Karnım aç. Nereye gitmeliyim?” der.
3. **Doğru yeri bul** — Şehirdeki 24 yere tıklanabilir; her yerin adı sesli okunur.
   Yanlış yere basılırsa uyarı sesi ve ekran sarsıntısı olur, 2 yanlıştan sonra doğru yer parlar.
4. **Yolculuk** — Doğru yere basınca araba yola çıkar, karakter binadan içeri girer.
   Yol boyunca “Zeynep postaneye gidiyor.” gibi bir cümle duyulur.
5. **Varış sorusu** — “Zeynep nerede?” sorusuna 3 resimli seçenekten biriyle cevap verilir.
   Doğru cevapta alkış ve yıldız, yanlışta uyarı sesi ve sarsıntı olur.
6. **Devam** — Doğru cevaptan sonra oyun otomatik olarak yeni bir ihtiyaç sorusuna geçer;
   “Sıradaki soru” düğmesiyle hemen ilerlenebilir.

## Teknik notlar

- Next.js 16 (App Router), React 19, TypeScript ve saf CSS.
- Ses, tarayıcıda üretilir: konuşma için **Web Speech API** (`tr-TR` sesi tercih edilir),
  alkış/uyarı/çınlama gibi efektler için **Web Audio API** kullanılır.
  Yumuşak bir ton için yavaş konuşma hızı ve ölçülü perde kullanılır; varsa Türkçe
  **kadın** sesi (Filiz/Yelda/Google Türkçe) seçilir. Cihazda yalnızca erkek Türkçe ses
  varsa (ör. Windows’ta Tolga) ses daha ince ve yavaş bir tonda kullanılır; başlangıç
  ekranındaki not hangi durumda olduğunu söyler.
- Karakterler ve şehir tamamen SVG ile çizilir: pastel renkli, yumuşak hatlı karakterler ve
  her dükkânın vitrininde o yerin içini anlatan ayrı bir sahne (veterinerde hayvanlar,
  spor salonunda aletler, kütüphanede raflar, itfaiyede itfaiye aracı vb.).
- Şehir haritası 6×4 yerleşimli 24 mekândan oluşur: hastane, eczane, veteriner, banka,
  kütüphane, postane, market, kafe, pastane, kırtasiye, dondurmacı, kuaför, spor salonu,
  havuz, park, çiçekçi, cami, sinema, itfaiye, karakol, diş kliniği, otogar, havalimanı, tamirci.
- 50 farklı ihtiyaç senaryosu karıştırılarak sunulur; aynı soru arka arkaya gelmez.
- Arayüz masaüstü, tablet ve telefonda çalışır; harita küçük ekranlarda kaydırılabilir.
