export type CharacterId =
  | "cocuk"
  | "anne"
  | "abla"
  | "baba"
  | "dede"
  | "nine";

export type Character = {
  id: CharacterId;
  name: string;
  role: string;
  who: string;
  skin: string;
  skinShade: string;
  hair: string;
  hairStyle: "pigtails" | "bun" | "ponytail" | "short" | "elder" | "scarfbun";
  outfit: string;
  outfitShade: string;
  accessory: "glasses" | "cane" | "mustache" | "none";
  size: number;
  voice: { pitch: number; rate: number };
};

export const CHARACTERS: Character[] = [
  {
    id: "cocuk",
    name: "Ece",
    role: "Çocuk",
    who: "kız çocuk",
    skin: "#FAD8C2",
    skinShade: "#F0C0A2",
    hair: "#7B4A2D",
    hairStyle: "pigtails",
    outfit: "#FF9EC4",
    outfitShade: "#F27FAF",
    accessory: "none",
    size: 0.9,
    voice: { pitch: 1.28, rate: 0.9 },
  },
  {
    id: "anne",
    name: "Elif",
    role: "Anne",
    who: "anne",
    skin: "#F8D5BC",
    skinShade: "#EAB894",
    hair: "#4E3423",
    hairStyle: "bun",
    outfit: "#B7A4F5",
    outfitShade: "#A48DEE",
    accessory: "none",
    size: 1,
    voice: { pitch: 1.06, rate: 0.9 },
  },
  {
    id: "abla",
    name: "Zeynep",
    role: "Abla",
    who: "abla",
    skin: "#F9D8BE",
    skinShade: "#EDBD97",
    hair: "#3A2517",
    hairStyle: "ponytail",
    outfit: "#7FD9B0",
    outfitShade: "#63C99C",
    accessory: "none",
    size: 0.94,
    voice: { pitch: 1.16, rate: 0.94 },
  },
  {
    id: "baba",
    name: "Ahmet",
    role: "Baba",
    who: "baba",
    skin: "#EDC29F",
    skinShade: "#DBA97F",
    hair: "#332216",
    hairStyle: "short",
    outfit: "#8FC4F5",
    outfitShade: "#76B1EB",
    accessory: "mustache",
    size: 1.02,
    voice: { pitch: 0.96, rate: 0.9 },
  },
  {
    id: "dede",
    name: "Mehmet",
    role: "Dede",
    who: "yaşlı dede",
    skin: "#EFC7A4",
    skinShade: "#D9AC84",
    hair: "#E9E5DD",
    hairStyle: "elder",
    outfit: "#C08957",
    outfitShade: "#A97042",
    accessory: "cane",
    size: 1,
    voice: { pitch: 0.9, rate: 0.86 },
  },
  {
    id: "nine",
    name: "Fatma",
    role: "Nine",
    who: "yaşlı nine",
    skin: "#F3CDAE",
    skinShade: "#E0B18C",
    hair: "#E8E4DC",
    hairStyle: "scarfbun",
    outfit: "#F3A6C6",
    outfitShade: "#E98FB4",
    accessory: "glasses",
    size: 0.98,
    voice: { pitch: 0.98, rate: 0.86 },
  },
];

export type ArtKind =
  | "shop"
  | "market"
  | "cafe"
  | "cinema"
  | "park"
  | "mosque"
  | "pool"
  | "hospital"
  | "fire"
  | "police"
  | "transport"
  | "repair";

export type Place = {
  id: string;
  name: string;
  dative: string;
  locative: string;
  emoji: string;
  art: ArtKind;
  wall: string;
  roof: string;
  accent: string;
  awning?: boolean;
  prop?: string;
};

export const PLACES: Place[] = [
  {
    id: "hastane",
    name: "Hastane",
    dative: "hastaneye",
    locative: "hastanede",
    emoji: "🏥",
    art: "hospital",
    wall: "#FFFFFF",
    roof: "#EF4444",
    accent: "#FCA5A5",
    prop: "🚑",
  },
  {
    id: "eczane",
    name: "Eczane",
    dative: "eczaneye",
    locative: "eczanede",
    emoji: "💊",
    art: "shop",
    wall: "#ECFDF5",
    roof: "#10B981",
    accent: "#6EE7B7",
    awning: true,
    prop: "🧴",
  },
  {
    id: "veteriner",
    name: "Veteriner",
    dative: "veterinere",
    locative: "veterinerde",
    emoji: "🐾",
    art: "shop",
    wall: "#FEF3C7",
    roof: "#F59E0B",
    accent: "#FCD34D",
    awning: true,
    prop: "🐶",
  },
  {
    id: "banka",
    name: "Banka",
    dative: "bankaya",
    locative: "bankada",
    emoji: "🏦",
    art: "shop",
    wall: "#EEF2FF",
    roof: "#4F46E5",
    accent: "#A5B4FC",
    prop: "💳",
  },
  {
    id: "kutuphane",
    name: "Kütüphane",
    dative: "kütüphaneye",
    locative: "kütüphanede",
    emoji: "📚",
    art: "shop",
    wall: "#FFF7ED",
    roof: "#B45309",
    accent: "#FCD34D",
    prop: "📖",
  },
  {
    id: "postane",
    name: "Postane",
    dative: "postaneye",
    locative: "postanede",
    emoji: "📮",
    art: "shop",
    wall: "#FEFCE8",
    roof: "#EAB308",
    accent: "#FDE68A",
    prop: "✉️",
  },
  {
    id: "market",
    name: "Market",
    dative: "markete",
    locative: "markette",
    emoji: "🛒",
    art: "market",
    wall: "#F0FDF4",
    roof: "#16A34A",
    accent: "#86EFAC",
    awning: true,
    prop: "🥕",
  },
  {
    id: "kafe",
    name: "Kafe",
    dative: "kafeye",
    locative: "kafede",
    emoji: "☕",
    art: "cafe",
    wall: "#FFF7ED",
    roof: "#92400E",
    accent: "#FDBA74",
    awning: true,
    prop: "🍰",
  },
  {
    id: "pastane",
    name: "Pastane",
    dative: "pastaneye",
    locative: "pastanede",
    emoji: "🧁",
    art: "shop",
    wall: "#FDF2F8",
    roof: "#EC4899",
    accent: "#F9A8D4",
    awning: true,
    prop: "🎂",
  },
  {
    id: "kirtasiye",
    name: "Kırtasiye",
    dative: "kırtasiyeye",
    locative: "kırtasiyede",
    emoji: "✏️",
    art: "shop",
    wall: "#FFF7ED",
    roof: "#EA580C",
    accent: "#FDBA74",
    awning: true,
    prop: "📒",
  },
  {
    id: "dondurmaci",
    name: "Dondurmacı",
    dative: "dondurmacıya",
    locative: "dondurmacıda",
    emoji: "🍦",
    art: "shop",
    wall: "#F0F9FF",
    roof: "#0EA5E9",
    accent: "#7DD3FC",
    awning: true,
    prop: "🍧",
  },
  {
    id: "kuafor",
    name: "Kuaför",
    dative: "kuaföre",
    locative: "kuaförde",
    emoji: "💇",
    art: "shop",
    wall: "#FAF5FF",
    roof: "#A855F7",
    accent: "#D8B4FE",
    prop: "✂️",
  },
  {
    id: "spor-salonu",
    name: "Spor Salonu",
    dative: "spor salonuna",
    locative: "spor salonunda",
    emoji: "🏋️",
    art: "shop",
    wall: "#F1F5F9",
    roof: "#475569",
    accent: "#94A3B8",
    prop: "🤸",
  },
  {
    id: "havuz",
    name: "Havuz",
    dative: "havuza",
    locative: "havuzda",
    emoji: "🏊",
    art: "pool",
    wall: "#E0F2FE",
    roof: "#0284C7",
    accent: "#38BDF8",
    prop: "🩱",
  },
  {
    id: "park",
    name: "Park",
    dative: "parka",
    locative: "parkta",
    emoji: "🌳",
    art: "park",
    wall: "#DCFCE7",
    roof: "#65A30D",
    accent: "#86EFAC",
    prop: "🛝",
  },
  {
    id: "cicekci",
    name: "Çiçekçi",
    dative: "çiçekçiye",
    locative: "çiçekçide",
    emoji: "🌷",
    art: "shop",
    wall: "#FDF2F8",
    roof: "#DB2777",
    accent: "#FBCFE8",
    awning: true,
    prop: "💐",
  },
  {
    id: "cami",
    name: "Cami",
    dative: "camiye",
    locative: "camide",
    emoji: "🕌",
    art: "mosque",
    wall: "#F5F5F4",
    roof: "#0F766E",
    accent: "#5EEAD4",
    prop: "🧎",
  },
  {
    id: "sinema",
    name: "Sinema",
    dative: "sinemaya",
    locative: "sinemada",
    emoji: "🎬",
    art: "cinema",
    wall: "#F5F3FF",
    roof: "#6D28D9",
    accent: "#C4B5FD",
    prop: "🍿",
  },
  {
    id: "itfaiye",
    name: "İtfaiye",
    dative: "itfaiyeye",
    locative: "itfaiyede",
    emoji: "🚒",
    art: "fire",
    wall: "#FEE2E2",
    roof: "#B91C1C",
    accent: "#F87171",
    prop: "🧑‍🚒",
  },
  {
    id: "karakol",
    name: "Karakol",
    dative: "karakola",
    locative: "karakolda",
    emoji: "🚓",
    art: "police",
    wall: "#EFF6FF",
    roof: "#1D4ED8",
    accent: "#93C5FD",
    prop: "👮",
  },
  {
    id: "dis-klinigi",
    name: "Diş Kliniği",
    dative: "diş kliniğine",
    locative: "diş kliniğinde",
    emoji: "🦷",
    art: "shop",
    wall: "#F0FDFA",
    roof: "#0D9488",
    accent: "#5EEAD4",
    prop: "🪥",
  },
  {
    id: "otogar",
    name: "Otogar",
    dative: "otogara",
    locative: "otogarda",
    emoji: "🚌",
    art: "transport",
    wall: "#F8FAFC",
    roof: "#0F766E",
    accent: "#99F6E4",
    prop: "🧳",
  },
  {
    id: "havalimani",
    name: "Havalimanı",
    dative: "havalimanına",
    locative: "havalimanında",
    emoji: "✈️",
    art: "transport",
    wall: "#F0F9FF",
    roof: "#0369A1",
    accent: "#7DD3FC",
    prop: "🧳",
  },
  {
    id: "tamirci",
    name: "Tamirci",
    dative: "tamirciye",
    locative: "tamircide",
    emoji: "🔧",
    art: "repair",
    wall: "#FAFAF9",
    roof: "#57534E",
    accent: "#D6D3D1",
    prop: "🛞",
  },
];

export const PLACE_MAP: Record<string, Place> = Object.fromEntries(
  PLACES.map((p) => [p.id, p]),
);

export type Scenario = {
  id: string;
  placeId: string;
  need: string;
};

export const SCENARIOS: Scenario[] = [
  // Hastane
  { id: "h1", placeId: "hastane", need: "Karnım çok ağrıyor, dayanamıyorum." },
  { id: "h2", placeId: "hastane", need: "Ateşim çok yüksek, başım dönüyor." },
  { id: "h3", placeId: "hastane", need: "Düştüm, kolum çok acıyor." },
  // Eczane
  { id: "ec1", placeId: "eczane", need: "İlaç almam lazım, boğazım çok ağrıyor." },
  { id: "ec2", placeId: "eczane", need: "Gözlerim kaşınıyor, damla almam lazım." },
  // Diş kliniği
  { id: "d1", placeId: "dis-klinigi", need: "Dişim çok ağrıyor, uyuyamıyorum." },
  { id: "d2", placeId: "dis-klinigi", need: "Dişim sallanıyor, korkuyorum." },
  // Veteriner
  { id: "v1", placeId: "veteriner", need: "Kedim hasta, iğne olması lazım." },
  { id: "v2", placeId: "veteriner", need: "Köpeğim topallıyor, yardım lazım." },
  { id: "v3", placeId: "veteriner", need: "Muhabbet kuşum hiç ötmüyor." },
  // Banka
  { id: "b1", placeId: "banka", need: "Kumbaramdaki parayı hesaba yatıracağım." },
  { id: "b2", placeId: "banka", need: "Paramı çekmem lazım, alışveriş yapacağım." },
  // Spor salonu
  { id: "sp1", placeId: "spor-salonu", need: "Kaslarımı çalıştırıp güçlenmek istiyorum." },
  { id: "sp2", placeId: "spor-salonu", need: "Koşu bandında koşmak istiyorum." },
  // Kuaför
  { id: "ku1", placeId: "kuafor", need: "Saçım çok uzadı, kestirmem lazım." },
  { id: "ku2", placeId: "kuafor", need: "Saçımı yaptırmam lazım, düğün var." },
  // Market
  { id: "m1", placeId: "market", need: "Ekmek ve süt alacağım." },
  { id: "m2", placeId: "market", need: "Meyve sebze alacağım, dolabım boş." },
  // Kütüphane
  { id: "k1", placeId: "kutuphane", need: "Kitap okumak için sessiz bir yer arıyorum." },
  { id: "k2", placeId: "kutuphane", need: "Ödünç kitap alacağım." },
  // Postane
  { id: "p1", placeId: "postane", need: "Mektup göndereceğim, pul yapıştıracağım." },
  { id: "p2", placeId: "postane", need: "Kargo paketimi göndereceğim." },
  // İtfaiye
  { id: "it1", placeId: "itfaiye", need: "Yangın çıktı, hemen yardım lazım!" },
  { id: "it2", placeId: "itfaiye", need: "Kedim ağaçta kaldı, indiremiyorum." },
  // Karakol
  { id: "ka1", placeId: "karakol", need: "Polise haber vermem lazım, cüzdanımı kaybettim." },
  { id: "ka2", placeId: "karakol", need: "Yardım istiyorum, kayboldum." },
  // Pastane
  { id: "pa1", placeId: "pastane", need: "Doğum günü için pasta alacağım." },
  { id: "pa2", placeId: "pastane", need: "Misafir geliyor, tatlı bir şeyler alacağım." },
  // Kafe
  { id: "kf1", placeId: "kafe", need: "Arkadaşımla kahve içeceğim." },
  { id: "kf2", placeId: "kafe", need: "Sıcak bir çay içmek istiyorum." },
  // Sinema
  { id: "s1", placeId: "sinema", need: "Film izlemek istiyorum, mısır da alacağım." },
  { id: "s2", placeId: "sinema", need: "Yeni filmi izlemeye gideceğim." },
  // Park
  { id: "pr1", placeId: "park", need: "Salıncağa binmek istiyorum." },
  { id: "pr2", placeId: "park", need: "Top oynamak için açık bir yer arıyorum." },
  // Kırtasiye
  { id: "kt1", placeId: "kirtasiye", need: "Okul için kalem ve defter alacağım." },
  { id: "kt2", placeId: "kirtasiye", need: "Boyama kalemlerim bitti, yenisini alacağım." },
  { id: "kt3", placeId: "kirtasiye", need: "Kalemtıraşım kırıldı, yenisini almam lazım." },
  // Cami
  { id: "c1", placeId: "cami", need: "Namaz kılmak istiyorum." },
  { id: "c2", placeId: "cami", need: "Dua etmek için sessiz bir yer arıyorum." },
  // Çiçekçi
  { id: "c3", placeId: "cicekci", need: "Anneme çiçek alacağım." },
  { id: "c4", placeId: "cicekci", need: "Bahçem için fidan alacağım." },
  // Dondurmacı
  { id: "do1", placeId: "dondurmaci", need: "Dondurma yemek istiyorum, hava çok sıcak." },
  { id: "do2", placeId: "dondurmaci", need: "Külah dondurma alacağım." },
  // Havuz
  { id: "hv1", placeId: "havuz", need: "Yüzmek istiyorum, mayom yanımda." },
  { id: "hv2", placeId: "havuz", need: "Suda oynamak istiyorum, çok sıcakladım." },
  // Otogar
  { id: "ot1", placeId: "otogar", need: "Otobüse binip başka bir şehre gideceğim." },
  { id: "ot2", placeId: "otogar", need: "Bilet alıp yolculuğa çıkacağım." },
  // Havalimanı
  { id: "ha1", placeId: "havalimani", need: "Uçağa binmem lazım, yolculuk başlıyor." },
  { id: "ha2", placeId: "havalimani", need: "Yurt dışına gideceğim, bavulum hazır." },
  // Gözlükçü kaldırıldı; gözlük ihtiyacı eczane/optik yerine kullanılmıyor.
  // Tamirci
  { id: "ta1", placeId: "tamirci", need: "Arabam bozuldu, çalışmıyor." },
  { id: "ta2", placeId: "tamirci", need: "Lastiğim patladı, yolda kaldım." },
];

export function getPlace(id: string): Place {
  return PLACE_MAP[id];
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
