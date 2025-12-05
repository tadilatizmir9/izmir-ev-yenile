import { Link } from "react-router-dom";
import { ChefHat, Bath, Home, Palette, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: ChefHat,
    title: "Mutfak Tadilatı",
    description:
      "Modern mutfak tasarımları, dolap yenileme, tezgah değişimi ve fonksiyonel alan düzenlemesi. Hayalinizdeki mutfağı birlikte tasarlayalım.",
    href: "/mutfak-tadilati",
  },
  {
    icon: Bath,
    title: "Banyo Tadilatı",
    description:
      "Banyo yenileme, seramik döşeme, tesisat ve armatür değişimi. Sızdırmaz ve modern banyolar için profesyonel çözümler.",
    href: "/banyo-tadilati",
  },
  {
    icon: Home,
    title: "Komple Ev Tadilatı",
    description:
      "Evinizi baştan sona yeniliyoruz. Elektrik, tesisat, boya, parke ve tüm detaylarda anahtar teslim hizmet.",
    href: "/komple-ev-tadilati",
  },
  {
    icon: Palette,
    title: "İç Mimarlık & 3D Tasarım",
    description:
      "Profesyonel iç mimar ekibimizle 3D görselleştirme ve proje çizimi. Tadilatınızı başlamadan önce görün.",
    href: "/ic-mimarlik",
  },
];

const Services = () => {
  return (
    <section id="hizmetler" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-muted-foreground text-lg">
            İzmir'de profesyonel tadilat ve iç mimarlık hizmetleri sunuyoruz. Her projede kalite ve
            memnuniyet garantisi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="inline-flex items-center text-primary font-medium text-sm group-hover:underline"
                >
                  Detaylı Bilgi
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
