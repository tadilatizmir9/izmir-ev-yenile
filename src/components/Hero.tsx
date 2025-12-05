import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-kitchen-renovation.jpg";
import { CONTACT } from "@/config/siteConfig";

const Hero = () => {
  const scrollToForm = () => {
    const element = document.getElementById("iletisim");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>İzmir Geneli Ücretsiz Keşif</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              İzmir'de Profesyonel <span className="text-primary">Anahtar Teslim</span> Tadilat
              Hizmeti
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Mutfak, banyo ve komple ev tadilatında uzman ekip, şeffaf fiyatlandırma ve garantili
              işçilik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Merhaba, tadilat için teklif almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Hemen Teklif Al</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToForm}
                className="text-base group"
              >
                Ücretsiz Keşif Formu
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Tamamlanan Proje</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">20+</p>
                <p className="text-sm text-muted-foreground">Yıllık Deneyim</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Müşteri Memnuniyeti</p>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={heroImage}
                alt="İzmir mutfak tadilatı örnek proje - modern beyaz mutfak tasarımı"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-lg border border-border">
              <p className="text-sm font-medium text-foreground">Ücretsiz Keşif</p>
              <p className="text-xs text-muted-foreground">Tüm İzmir ilçeleri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
