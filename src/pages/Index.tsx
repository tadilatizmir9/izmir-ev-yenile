import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_URL, TAGLINE, CONTACT, SERVICES, SERVICE_AREAS, DEFAULT_SEO } from "@/config/siteConfig";

const Index = () => {
  // LocalBusiness structured data for homepage
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: DEFAULT_SEO.description,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İzmir",
      addressRegion: "İzmir",
      addressCountry: "TR",
      streetAddress: CONTACT.address,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange: "$$",
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: [],
  };

  // HomeAndConstructionBusiness structured data (more specific)
  const homeConstructionJsonLd = {
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

  // Use LocalBusiness as primary structured data
  const structuredData = localBusinessJsonLd;

  const serviceAreas = [
    { name: "Bornova Tadilat", slug: "/bornova-tadilat" },
    { name: "Karşıyaka Tadilat", slug: "/karsiyaka-tadilat" },
    { name: "Buca Tadilat", slug: "/buca-tadilat" },
    { name: "Alsancak Tadilat", slug: "/alsancak-tadilat" },
    { name: "Konak Tadilat", slug: "/konak-tadilat" },
    { name: "Gaziemir Tadilat", slug: "/gaziemir-tadilat" },
    { name: "Mavişehir Tadilat", slug: "/mavisehir-tadilat" },
    { name: "Narlıdere Tadilat", slug: "/narlidere-tadilat" },
    { name: "Urla Tadilat", slug: "/urla-tadilat" },
    { name: "Çeşme Tadilat", slug: "/cesme-tadilat" },
    { name: "Güzelbahçe Tadilat", slug: "/guzelbahce-tadilat" },
    { name: "Bayraklı Tadilat", slug: "/bayrakli-tadilat" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="İzmir Tadilat Uzmanı | Mutfak, Banyo & Komple Ev Tadilatı | Ücretsiz Keşif"
        description="İzmir'in en güvenilir tadilat firması. Mutfak, banyo ve komple ev tadilatında profesyonel hizmet. İç mimar desteği, 2 yıl garanti, ücretsiz keşif. Hemen teklif alın!"
        url={SITE_URL}
        image={`${SITE_URL}/og-image.jpg`}
        type="website"
        jsonLd={structuredData}
      />
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Projects />
      
      {/* Hizmet Verdiğimiz Bölgeler */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hizmet Verdiğimiz Bölgeler
            </h2>
            <p className="text-muted-foreground text-lg">
              İzmir'in farklı ilçelerinde anahtar teslim tadilat ve iç mimarlık hizmeti veriyoruz. Aşağıdan bölgenizi seçerek detayları inceleyebilirsiniz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <Button
                key={area.slug}
                variant="outline"
                size="lg"
                className="h-auto py-4 justify-center text-base hover:bg-primary hover:text-primary-foreground transition-colors"
                asChild
              >
                <Link to={area.slug}>{area.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
