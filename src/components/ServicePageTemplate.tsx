import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { SEO } from "./SEO";
import { CONTACT, SITE_URL } from "@/config/siteConfig";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface ServicePageTemplateProps {
  title: string;
  description: string;
  metaTitle: string;
  image?: string;
  slug: string;
}

const ServicePageTemplate = ({
  title,
  description,
  metaTitle,
  image,
  slug,
}: ServicePageTemplateProps) => {
  const location = useLocation();
  const pageUrl = `${SITE_URL}${location.pathname}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : undefined;

  const [pageContent, setPageContent] = useState<{
    heading: string | null;
    body: string | null;
    meta_title: string | null;
    meta_description: string | null;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data, error } = await supabase.from("page_content").select("*").eq("slug", slug).maybeSingle();
        if (error) throw error;
        if (isMounted) {
          setPageContent(
            data
              ? {
                  heading: data.heading,
                  body: data.body,
                  meta_title: data.meta_title,
                  meta_description: data.meta_description,
                }
              : null
          );
        }
      } catch (error) {
        console.error("Sayfa içeriği yüklenemedi:", error);
        if (isMounted) setPageContent(null);
      }
    };
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const finalHeading = pageContent?.heading || title;
  const finalMetaTitle = pageContent?.meta_title || metaTitle;
  const finalMetaDescription = pageContent?.meta_description || description;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={finalMetaTitle}
        description={finalMetaDescription}
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
                  {finalHeading}
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

        {pageContent?.body && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto prose prose-lg text-black">
                <div className="leading-relaxed prose prose-lg max-w-none text-black">
                  <div className="text-black" dangerouslySetInnerHTML={{ __html: pageContent.body }} />
                </div>
              </div>
            </div>
          </section>
        )}

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
