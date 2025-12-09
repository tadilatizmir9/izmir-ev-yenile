import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceBanyo from "@/assets/service-banyo.jpg";

const BanyoTadilati = () => {
  return (
    <ServicePageTemplate
      slug="banyo-tadilati"
      title="İzmir Banyo Tadilatı"
      description="Profesyonel ekibimizle banyonuzu modern ve fonksiyonel bir alana dönüştürüyoruz. Sızdırmaz ve kaliteli işçilik garantisi."
      metaTitle="Banyo Tadilatı İzmir | Profesyonel Banyo Yenileme Hizmeti"
      image={serviceBanyo}
    />
  );
};

export default BanyoTadilati;
