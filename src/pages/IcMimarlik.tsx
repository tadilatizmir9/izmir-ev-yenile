import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceIcMimarlik from "@/assets/service-icmimarlik.jpg";

const IcMimarlik = () => {
  return (
    <ServicePageTemplate
      slug="ic-mimarlik"
      title="İzmir İç Mimarlık ve 3D Tasarım"
      description="Profesyonel iç mimar ekibimizle mekanlarınızı baştan tasarlayın. 3D görselleştirme ile projenizi önceden görün."
      metaTitle="İç Mimarlık İzmir | 3D Tasarım ve Proje Çizimi Hizmeti"
      image={serviceIcMimarlik}
    />
  );
};

export default IcMimarlik;
