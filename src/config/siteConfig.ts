/**
 * Central configuration file for all project-wide constants
 * Update values here to change them across the entire application
 */

export const SITE_NAME = "Tadilat İzmir";

export const TAGLINE =
  "İzmir'de mutfak, banyo ve komple ev tadilatında profesyonel iç mimar ekibiyle anahtar teslim çözümler";

export const SITE_URL = "https://tadilatizmir.net";

export const CONTACT = {
  phone: "+90 533 478 99 23",
  phoneDisplay: "0533 478 9923",
  whatsapp: "https://wa.me/905334789923",
  whatsappMessage: "Merhaba, tadilat hizmeti hakkında bilgi almak istiyorum.",
  email: "info@tadilatizmir.net",
  address: "İzmir, Türkiye",
} as const;

export const SERVICE_AREAS = [
  "Bornova",
  "Karşıyaka",
  "Buca",
  "Bayraklı",
  "Konak",
  "Narlıdere",
  "Balçova",
  "Alsancak",
  "Gaziemir",
  "Çiğli",
  "Karabağlar",
  "Güzelbahçe",
  "Foça",
  "Menemen",
] as const;

export const SERVICES = [
  "Mutfak Tadilatı",
  "Banyo Tadilatı",
  "Komple Ev Tadilatı",
  "İç Mimarlık & 3D Tasarım",
] as const;

export const SERVICE_SLUGS = {
  mutfak: "Mutfak Tadilatı",
  banyo: "Banyo Tadilatı",
  komple: "Komple Ev Tadilatı",
  diger: "Diğer",
} as const;

export const DEFAULT_SEO = {
  title: `${SITE_NAME} | Anahtar Teslim Tadilat ve İç Mimarlık Hizmetleri`,
  description: `${TAGLINE}. Ücretsiz keşif ve şeffaf fiyatlandırma.`,
} as const;



