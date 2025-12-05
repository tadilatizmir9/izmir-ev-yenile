import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { CONTACT } from "@/config/siteConfig";

const KonakTadilat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Konak Tadilat Hizmetleri
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Konak ve çevresinde profesyonel tadilat hizmetleri. Villa, daire ve ofis tadilatında
                20 yılı aşkın tecrübe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    Ücretsiz Teklif Al
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${CONTACT.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Konak'ta Profesyonel Tadilat
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Konak, İzmir'in tarihi ve kültürel merkezi olarak öne çıkmaktadır. Bu prestijli
                  semtte villa, apartman dairesi ve ofis tadilatı konusunda uzmanlaşmış ekibimizle
                  hizmetinizdeyiz. Tarihi dokuyu koruyarak modern yaşam standartlarını bir araya
                  getiren projeler üretiyoruz.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Hizmetlerimiz</h3>
                  <ul className="space-y-3">
                    {[
                      "Villa Tadilatı",
                      "Daire Yenileme",
                      "Ofis Dekorasyonu",
                      "Banyo Renovasyonu",
                      "Mutfak Tadilatı",
                      "Zemin Kaplama",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Neden Biz?</h3>
                  <ul className="space-y-3">
                    {[
                      "20+ Yıllık Deneyim",
                      "Ücretsiz Keşif",
                      "Şeffaf Fiyatlandırma",
                      "2 Yıl Garanti",
                      "Profesyonel Ekip",
                      "Zamanında Teslimat",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Konak'ta Ücretsiz Keşif
                </h3>
                <p className="text-muted-foreground mb-6">
                  Projeniz için ücretsiz keşif ve detaylı fiyat teklifi almak için hemen iletişime
                  geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                      WhatsApp ile İletişim
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Ana Sayfaya Dön</Link>
                  </Button>
                </div>
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

export default KonakTadilat;
