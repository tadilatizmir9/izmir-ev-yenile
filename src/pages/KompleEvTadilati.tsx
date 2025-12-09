import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceKomple from "@/assets/service-komple.jpg";

const KompleEvTadilati = () => {
  return (
    <ServicePageTemplate
      slug="komple-ev-tadilati"
      title="İzmir Komple Ev Tadilatı"
      description="Evinizi baştan sona yeniliyoruz. Elektrik, tesisat, boya, parke ve tüm detaylarda anahtar teslim profesyonel hizmet."
      metaTitle="Komple Ev Tadilatı İzmir | Anahtar Teslim Tadilat Hizmeti"
      image={serviceKomple}
    />
  );
};

export default KompleEvTadilati;
