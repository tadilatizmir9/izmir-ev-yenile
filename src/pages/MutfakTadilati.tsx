import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceMutfak from "@/assets/service-mutfak.jpg";

const MutfakTadilati = () => {
  return (
    <ServicePageTemplate
      slug="mutfak-tadilati"
      title="İzmir Mutfak Tadilatı"
      description="Hayalinizdeki mutfağı birlikte tasarlayalım. Modern dolaplar, kaliteli tezgahlar ve fonksiyonel alanlar için profesyonel çözümler."
      metaTitle="Mutfak Tadilatı İzmir | Profesyonel Mutfak Yenileme Hizmeti"
      image={serviceMutfak}
    />
  );
};

export default MutfakTadilati;
