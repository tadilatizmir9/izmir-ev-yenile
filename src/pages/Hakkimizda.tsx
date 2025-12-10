import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SEO } from "@/components/SEO";
import { SITE_URL, DEFAULT_SEO } from "@/config/siteConfig";

const Hakkimizda = () => {
  const title = "Hakkımızda | Tadilat İzmir";
  const description =
    "Tadilat İzmir hakkında bilgi alın. İzmir’de profesyonel tadilat çözüm ortakları ile çalışan güvenilir bir yönlendirme platformu.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={title} description={description} url={`${SITE_URL}/hakkimizda`} type="website" />
      <Header />

      <main className="pt-24 pb-20">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-primary font-medium uppercase tracking-wide">Tadilat İzmir</p>
              <h1 className="text-3xl md:text-4xl font-display font-bold">Hakkımızda</h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                İzmir’de mutfak, banyo, komple ev tadilatı ve iç mimari çözümler için profesyonel ekiplerle
                çalışırız. Amacımız, ihtiyaçlarınıza en uygun uzmanları şeffaf ve güvenilir şekilde
                yönlendirmek.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                <h2 className="text-xl font-semibold">Nasıl Çalışıyoruz?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tadilat İzmir, İzmir genelinde deneyimli ustalar ve iç mimarlarla çalışan bir yönlendirme
                  platformudur. İhtiyaçlarınızı dinler, doğru ekipleri önerir ve sürecin şeffaf ilerlemesini
                  sağlarız. Her projede keşif, planlama, zamanlama ve iletişim adımlarına önem veririz.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                <h2 className="text-xl font-semibold">Neleri Önemsiyoruz?</h2>
                <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Şeffaf fiyatlandırma ve net teklifler</li>
                  <li>Kaliteli işçilik ve uygun malzeme seçimi</li>
                  <li>Zamanında teslim ve düzenli bilgilendirme</li>
                  <li>İç mimar desteği ve işlevsel tasarım</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Neden Biz?</h2>
              <p className="text-muted-foreground leading-relaxed">
                İzmir’in her ilçesinde güvenilir ustalarla çalışır, doğru ekipleri projeye göre eşleştiririz.
                Mutfak, banyo, komple ev tadilatı ve iç mimari projelerinde kalite, estetik ve bütçe dengesini
                ön planda tutarız. Sürecin her adımında iletişimde kalarak beklentilerinizi karşılamaya
                odaklanırız.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Hakkimizda;

