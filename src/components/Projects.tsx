import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import projectBornova from "@/assets/project-bornova.jpg";
import projectKarsiyaka from "@/assets/project-karsiyaka.jpg";
import projectAlsancak from "@/assets/project-alsancak.jpg";
import projectBuca from "@/assets/project-buca.jpg";
import projectKonak from "@/assets/project-konak.jpg";
import projectGaziemir from "@/assets/project-gaziemir.jpg";

const projects = [
  {
    title: "Bornova 3+1 Komple Tadilat",
    description:
      "Modern ve minimalist bir tasarımla 120 m² dairenin tamamen yenilenmesi. Mutfak, banyo ve tüm odalar baştan aşağı yenilendi.",
    location: "Bornova",
    type: "Komple Tadilat",
    link: "/bornova-tadilat",
    image: projectBornova,
  },
  {
    title: "Karşıyaka Mutfak Yenileme",
    description:
      "Açık mutfak konseptiyle 25 m² mutfak alanının modernize edilmesi. Özel tasarım dolaplar ve ada tezgah uygulaması.",
    location: "Karşıyaka",
    type: "Mutfak Tadilatı",
    link: "/karsiyaka-tadilat",
    image: projectKarsiyaka,
  },
  {
    title: "Alsancak Banyo Renovasyonu",
    description:
      "Lüks banyo tasarımı, yağmur duşu ve jakuzi kurulumu. Premium seramik ve armatür kullanıldı.",
    location: "Alsancak",
    type: "Banyo Tadilatı",
    link: "/alsancak-tadilat",
    image: projectAlsancak,
  },
  {
    title: "Buca 2+1 Daire Yenileme",
    description:
      "Genç çift için modern ve fonksiyonel yaşam alanı. Açık plan mutfak-salon düzenlemesi ve özel aydınlatma çözümleri.",
    location: "Buca",
    type: "Komple Tadilat",
    link: "/buca-tadilat",
    image: projectBuca,
  },
  {
    title: "Konak Villa Renovasyonu",
    description: "300 m² villa için kapsamlı yenileme. Özel tasarım ve premium malzeme kullanımı.",
    location: "Konak",
    type: "Komple Tadilat",
    link: "/konak-tadilat",
    image: projectKonak,
  },
  {
    title: "Gaziemir Ofis Tadilat",
    description:
      "Kurumsal ofis alanının yeniden tasarımı. Açık ofis konsepti, toplantı odaları ve ergonomik çalışma alanları.",
    location: "Gaziemir",
    type: "Ofis Tadilatı",
    link: "/gaziemir-tadilat",
    image: projectGaziemir,
  },
];

const Projects = () => {
  return (
    <section id="projeler" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tamamlanan Projeler
          </h2>
          <p className="text-muted-foreground text-lg">
            İzmir'in farklı semtlerinde gerçekleştirdiğimiz tadilat projelerinden örnekler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.location} tadilat projesi`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">{project.location}</span>
                  <Button variant="ghost" size="sm" className="text-primary p-0 h-auto" asChild>
                    <Link to={project.link}>
                      Detayları Gör
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
