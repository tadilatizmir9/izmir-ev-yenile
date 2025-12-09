import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { SEO } from "./SEO";
import { CONTACT, SITE_URL } from "@/config/siteConfig";
import { useLocation } from "react-router-dom";

interface ServicePageTemplateProps {
  title: string;
  description: string;
  content: string[];
  metaTitle: string;
  image?: string;
}

const ServicePageTemplate = ({
  title,
  description,
  content,
  metaTitle,
  image,
}: ServicePageTemplateProps) => {
  const location = useLocation();
  const pageUrl = `${SITE_URL}${location.pathname}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={metaTitle}
        description={description}
        url={pageUrl}
        image={ogImage}
        type="website"
      />
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">{description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <a
                      href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Merhaba, tadilat için teklif almak istiyorum.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Teklif Al</span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`tel:${CONTACT.phone}`}>Hemen Ara</a>
                  </Button>
                </div>
              </div>

              {image && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              {content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Ücretsiz Keşif İçin Bizi Arayın
              </h2>
              <p className="text-muted-foreground mb-8">
                İzmir genelinde ücretsiz yerinde keşif yapıyor, detaylı fiyat teklifi sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp ile Ulaşın
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/">
                    Ana Sayfaya Dön
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicePageTemplate;
