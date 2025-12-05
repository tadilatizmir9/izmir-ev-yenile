import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SEO } from "@/components/SEO";
import { SITE_NAME, SITE_URL, TAGLINE, CONTACT, SERVICES } from "@/config/siteConfig";

const Index = () => {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    description: `${TAGLINE}. Ücretsiz keşif ve şeffaf fiyatlandırma.`,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İzmir",
      addressRegion: "İzmir",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "City",
      name: "İzmir",
    },
    serviceType: [SERVICES[0], SERVICES[1], SERVICES[2], SERVICES[3], "Anahtar Teslim Tadilat"],
    priceRange: "$$",
    image: `${SITE_URL}/og-image.jpg`,
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="İzmir Tadilat Uzmanı | Mutfak, Banyo & Komple Ev Tadilatı | Ücretsiz Keşif"
        description="İzmir'in en güvenilir tadilat firması. Mutfak, banyo ve komple ev tadilatında profesyonel hizmet. İç mimar desteği, 2 yıl garanti, ücretsiz keşif. Hemen teklif alın!"
        canonicalUrl={SITE_URL}
        ogImage={`${SITE_URL}/og-image.jpg`}
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Projects />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
