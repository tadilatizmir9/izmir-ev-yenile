import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceKomple from "@/assets/service-komple.jpg";

const KompleEvTadilati = () => {
  return (
    <ServicePageTemplate
      title="İzmir Komple Ev Tadilatı"
      description="Evinizi baştan sona yeniliyoruz. Elektrik, tesisat, boya, parke ve tüm detaylarda anahtar teslim profesyonel hizmet."
      metaTitle="Komple Ev Tadilatı İzmir | Anahtar Teslim Tadilat Hizmeti"
      image={serviceKomple}
      content={[
        "Komple ev tadilatı, kapsamlı bir planlama ve koordinasyon gerektirir. İzmir'de 20 yılı aşkın deneyimimizle evinizi baştan sona yeniliyoruz. Elektrik, tesisat, boya, parke, duvar örme, alçı ve dekorasyon dahil tüm işlemleri tek elden yönetiyoruz.",
        "Anahtar teslim hizmet anlayışımızla siz sadece anahtarı teslim alırsınız. Proje sürecinde sizi düzenli olarak bilgilendiriyor, her aşamayı şeffaf şekilde paylaşıyoruz. Zamanında teslim garantisi veriyoruz.",
        "İç mimar ekibimiz projenizi en başından planlar, 3D görselleştirme yapar ve size alternatifler sunar. Böylece evinizi yenilemeden önce nasıl görüneceğini bilirsiniz. Ücretsiz keşif için hemen bizi arayın.",
      ]}
    />
  );
};

export default KompleEvTadilati;
