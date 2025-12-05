import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { CONTACT } from "@/config/siteConfig";

const AlsancakTadilat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Alsancak Tadilat Hizmetleri
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Alsancak'ta lüks daire ve işyeri tadilatında uzman ekip. Premium malzeme ve işçilik
                garantisi.
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
                  Alsancak'ta Premium Tadilat
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Alsancak, İzmir'in en prestijli semtlerinden biri olarak modern yaşamın merkezi
                  konumundadır. Bu özel bölgede lüks daire, butik otel ve işyeri tadilatı konusunda
                  uzmanlaşmış ekibimizle, en yüksek standartlarda hizmet sunuyoruz. Premium
                  malzemeler ve özenli işçilik ile hayalinizdeki mekanı gerçeğe dönüştürüyoruz.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Alsancak'ta Hizmetlerimiz
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Lüks Daire Tadilatı",
                      "Banyo Renovasyonu",
                      "Modern Mutfak Tasarımı",
                      "Zemin ve Duvar Kaplamaları",
                      "Aydınlatma Sistemleri",
                      "Akıllı Ev Çözümleri",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Avantajlarımız</h3>
                  <ul className="space-y-3">
                    {[
                      "20+ Yıllık Tecrübe",
                      "Premium Malzeme Kullanımı",
                      "Detaylı 3D Tasarım",
                      "2 Yıl İşçilik Garantisi",
                      "Profesyonel Proje Yönetimi",
                      "Zamanında Teslim",
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
                  Alsancak'ta Ücretsiz Keşif
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

export default AlsancakTadilat;
