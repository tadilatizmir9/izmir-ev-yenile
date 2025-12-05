import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { CONTACT } from "@/config/siteConfig";

const GaziemirTadilat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Gaziemir Tadilat Hizmetleri
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Gaziemir'de konut ve ofis tadilatında profesyonel çözümler. Uygun fiyat, kaliteli
                işçilik.
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Gaziemir'de Kaliteli Tadilat
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gaziemir, İzmir'in hızla gelişen ve modern yaşam alanları sunan önemli
                  ilçelerinden biridir. Bu dinamik bölgede konut, ofis ve ticari alan tadilatı
                  konusunda geniş deneyime sahibiz. Havaalanına yakınlığı ile iş dünyasının merkezi
                  olan Gaziemir'de, kurumsal ofislerden aile dairelerine kadar her türlü projeye
                  profesyonel çözümler sunuyoruz.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Gaziemir'de Hizmetlerimiz
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Ofis Tadilatı",
                      "Daire Yenileme",
                      "Ticari Alan Düzenlemesi",
                      "Mutfak ve Banyo Renovasyonu",
                      "Boya ve Dekorasyon",
                      "Elektrik ve Tesisat",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Neden Tercih Ediliyoruz?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "20+ Yıl Sektör Deneyimi",
                      "Uygun Fiyat Politikası",
                      "Kaliteli Malzeme",
                      "2 Yıl Garanti",
                      "Hızlı Teslimat",
                      "7/24 Destek",
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
                  Gaziemir'de Ücretsiz Keşif
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

export default GaziemirTadilat;
