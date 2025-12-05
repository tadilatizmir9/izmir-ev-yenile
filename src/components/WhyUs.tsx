import { Users, Clock, FileText, Shield, MapPin } from "lucide-react";
import whyUsImage from "@/assets/whyus-team.jpg";

const reasons = [
  {
    icon: Users,
    title: "Profesyonel İç Mimar ile Çalışma",
    description: "Deneyimli iç mimarlarımız projenizi baştan sona planlar ve uygular.",
  },
  {
    icon: Clock,
    title: "Zamanında Teslim Sözleşmesi",
    description: "Proje süresini sözleşmeyle garantiliyoruz, gecikmeler için ceza ödüyoruz.",
  },
  {
    icon: FileText,
    title: "Şeffaf ve Yazılı Fiyat Teklifleri",
    description: "Gizli maliyet yok. Tüm kalemleri detaylı şekilde yazılı olarak sunuyoruz.",
  },
  {
    icon: Shield,
    title: "Garantili İşçilik ve Kaliteli Malzeme",
    description: "A sınıfı malzemeler ve 2 yıl işçilik garantisi ile hizmet veriyoruz.",
  },
  {
    icon: MapPin,
    title: "İzmir Geneli Ücretsiz Keşif",
    description: "İzmir'in tüm ilçelerinde ücretsiz yerinde keşif ve fiyat teklifi sunuyoruz.",
  },
];

const WhyUs = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Neden Tadilat İzmir?
              </h2>
              <p className="text-muted-foreground text-lg">
                20 yılı aşkın deneyimimiz ve yüzlerce mutlu müşterimizle İzmir'in güvenilir tadilat
                markasıyız.
              </p>
            </div>

            <div className="space-y-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                    <reason.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={whyUsImage}
                alt="Tadilat İzmir profesyonel ekip"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Proje</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-primary">20+</p>
                  <p className="text-xs text-muted-foreground">Yıl Deneyim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
