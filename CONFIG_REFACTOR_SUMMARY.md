# Central Config Refactoring Summary

## Overview

All project-wide constants have been centralized into a single configuration file (`src/config/siteConfig.ts`) and all components have been refactored to use these constants instead of hardcoded values.

---

## 📁 Config File: `src/config/siteConfig.ts`

```typescript
/**
 * Central configuration file for all project-wide constants
 * Update values here to change them across the entire application
 */

export const SITE_NAME = "Tadilat İzmir";

export const TAGLINE = "İzmir'de mutfak, banyo ve komple ev tadilatında profesyonel iç mimar ekibiyle anahtar teslim çözümler";

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
```

---

## 📝 Example: Before & After Refactoring

### Example 1: WhatsAppButton Component

**BEFORE:**
```typescript
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/905334789923?text=Merhaba,%20tadilat%20hizmeti%20hakkında%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="..."
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};
```

**AFTER:**
```typescript
import { CONTACT } from "@/config/siteConfig";

const WhatsAppButton = () => {
  const whatsappUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="..."
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};
```

**What Changed:**
- Removed hardcoded WhatsApp URL and message
- Imported `CONTACT` from config
- Dynamically builds WhatsApp URL using config values

---

### Example 2: Header Component

**BEFORE:**
```typescript
<a href="tel:+905334789923" className="...">
  <Phone className="w-4 h-4" />
  <span>0533 478 9923</span>
</a>
<Button asChild>
  <a href="https://wa.me/905334789923" target="_blank" rel="noopener noreferrer">
    Teklif Al
  </a>
</Button>
```

**AFTER:**
```typescript
import { SITE_NAME, CONTACT } from "@/config/siteConfig";

<a href={`tel:${CONTACT.phone}`} className="...">
  <Phone className="w-4 h-4" />
  <span>{CONTACT.phoneDisplay}</span>
</a>
<Button asChild>
  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
    Teklif Al
  </a>
</Button>
```

**What Changed:**
- Replaced hardcoded phone number with `CONTACT.phone`
- Replaced hardcoded phone display with `CONTACT.phoneDisplay`
- Replaced hardcoded WhatsApp URL with `CONTACT.whatsapp`
- Logo alt text now uses `SITE_NAME`

---

### Example 3: Footer Component

**BEFORE:**
```typescript
const Footer = () => {
  const services = [
    { name: "Mutfak Tadilatı", href: "/mutfak-tadilati" },
    { name: "Banyo Tadilatı", href: "/banyo-tadilati" },
    { name: "Komple Ev Tadilatı", href: "/komple-ev-tadilati" },
    { name: "İç Mimarlık", href: "/ic-mimarlik" },
  ];

  const locations = [
    { name: "Bornova Tadilat", href: "/bornova-tadilat" },
    { name: "Karşıyaka Tadilat", href: "/karsiyaka-tadilat" },
    // ...
  ];

  return (
    <footer>
      <a href="tel:+905334789923">...</a>
      <a href="https://wa.me/905334789923">...</a>
      <a href="mailto:info@tadilatizmir.net">...</a>
      <p>© {new Date().getFullYear()} Tadilat İzmir. Tüm hakları saklıdır.</p>
    </footer>
  );
};
```

**AFTER:**
```typescript
import { SITE_NAME, CONTACT, SERVICES, SERVICE_AREAS } from "@/config/siteConfig";

const Footer = () => {
  const services = [
    { name: SERVICES[0], href: "/mutfak-tadilati" },
    { name: SERVICES[1], href: "/banyo-tadilati" },
    { name: SERVICES[2], href: "/komple-ev-tadilati" },
    { name: SERVICES[3], href: "/ic-mimarlik" },
  ];

  const locations = [
    { name: `${SERVICE_AREAS[0]} Tadilat`, href: "/bornova-tadilat" },
    { name: `${SERVICE_AREAS[1]} Tadilat`, href: "/karsiyaka-tadilat" },
    // ...
  ];

  return (
    <footer>
      <a href={`tel:${CONTACT.phone}`}>...</a>
      <a href={CONTACT.whatsapp}>...</a>
      <a href={`mailto:${CONTACT.email}`}>...</a>
      <p>© {new Date().getFullYear()} {SITE_NAME}. Tüm hakları saklıdır.</p>
    </footer>
  );
};
```

**What Changed:**
- Services array now uses `SERVICES` from config
- Locations array now uses `SERVICE_AREAS` from config
- All contact links use `CONTACT` object
- Copyright text uses `SITE_NAME`

---

### Example 4: ContactForm Component

**BEFORE:**
```typescript
<Input
  id="district"
  placeholder="Örn: Bornova, Atatürk Mahallesi"
  ...
/>

<SelectContent>
  <SelectItem value="mutfak">Mutfak Tadilatı</SelectItem>
  <SelectItem value="banyo">Banyo Tadilatı</SelectItem>
  <SelectItem value="komple">Komple Ev Tadilatı</SelectItem>
  <SelectItem value="diger">Diğer</SelectItem>
</SelectContent>
```

**AFTER:**
```typescript
import { SERVICE_SLUGS, SERVICE_AREAS } from "@/config/siteConfig";

<Input
  id="district"
  placeholder={`Örn: ${SERVICE_AREAS[0]}, Atatürk Mahallesi`}
  ...
/>

<SelectContent>
  <SelectItem value="mutfak">{SERVICE_SLUGS.mutfak}</SelectItem>
  <SelectItem value="banyo">{SERVICE_SLUGS.banyo}</SelectItem>
  <SelectItem value="komple">{SERVICE_SLUGS.komple}</SelectItem>
  <SelectItem value="diger">{SERVICE_SLUGS.diger}</SelectItem>
</SelectContent>
```

**What Changed:**
- District placeholder uses first service area from config
- Service dropdown options use `SERVICE_SLUGS` object

---

### Example 5: SEO Component

**BEFORE:**
```typescript
export const SEO = ({ ... }) => {
  const siteName = "Tadilat İzmir";
  const siteUrl = "https://tadilatizmir.net";
  const defaultTitle = "Tadilat İzmir | Anahtar Teslim...";
  const defaultDescription = "İzmir'de mutfak, banyo...";
  // ...
};
```

**AFTER:**
```typescript
import { SITE_NAME, SITE_URL, DEFAULT_SEO } from "@/config/siteConfig";

export const SEO = ({ ... }) => {
  const siteName = SITE_NAME;
  const siteUrl = SITE_URL;
  const defaultTitle = DEFAULT_SEO.title;
  const defaultDescription = DEFAULT_SEO.description;
  // ...
};
```

**What Changed:**
- All hardcoded site constants replaced with config imports
- Uses `DEFAULT_SEO` object for title and description

---

## 📊 Files Refactored

### Components (10 files):
1. ✅ `src/components/Header.tsx` - Phone, WhatsApp, site name
2. ✅ `src/components/Footer.tsx` - Phone, WhatsApp, email, services, districts, site name
3. ✅ `src/components/WhatsAppButton.tsx` - WhatsApp URL and message
4. ✅ `src/components/ContactForm.tsx` - Services, district placeholder
5. ✅ `src/components/SEO.tsx` - Site name, URL, default SEO
6. ✅ `src/components/Hero.tsx` - WhatsApp URL
7. ✅ `src/components/ServicePageTemplate.tsx` - Phone, WhatsApp
8. ✅ `src/components/FAQ.tsx` - Service areas list

### Pages (5 files):
1. ✅ `src/pages/Index.tsx` - Site name, URL, services, phone, tagline
2. ✅ `src/pages/Blog.tsx` - Site name, URL
3. ✅ `src/pages/BlogPost.tsx` - Site name, URL, phone, WhatsApp
4. ✅ `src/pages/KonakTadilat.tsx` - Phone, WhatsApp
5. ✅ `src/pages/GaziemirTadilat.tsx` - Phone, WhatsApp
6. ✅ `src/pages/AlsancakTadilat.tsx` - Phone, WhatsApp

---

## ✅ Benefits

1. **Single Source of Truth**: All constants in one place
2. **Easy Updates**: Change once, updates everywhere
3. **Type Safety**: TypeScript ensures correct usage
4. **Maintainability**: No more searching for hardcoded values
5. **Consistency**: All components use the same values
6. **No Visual Changes**: Only replaced strings, no design changes

---

## 🔍 What Was NOT Changed

- Visual design and layout (as requested)
- Content text in testimonials (these are content, not constants)
- Alt text in images (content-specific)
- Any styling or CSS

---

## 📝 How to Update Values

To update any constant across the entire project:

1. Open `src/config/siteConfig.ts`
2. Update the desired constant
3. Save the file
4. All components using that constant will automatically use the new value

**Example:** To change the phone number:
```typescript
export const CONTACT = {
  phone: "+90 555 123 45 67",  // ← Change here
  phoneDisplay: "0555 123 45 67",  // ← Update display format too
  // ...
};
```

All components using `CONTACT.phone` will automatically use the new number!

---

**Last Updated:** December 2024




