import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceIcMimarlik from "@/assets/service-icmimarlik.jpg";

const IcMimarlik = () => {
  return (
    <ServicePageTemplate
      title="İzmir İç Mimarlık ve 3D Tasarım"
      description="Profesyonel iç mimar ekibimizle mekanlarınızı baştan tasarlayın. 3D görselleştirme ile projenizi önceden görün."
      metaTitle="İç Mimarlık İzmir | 3D Tasarım ve Proje Çizimi Hizmeti"
      image={serviceIcMimarlik}
      content={[
        "İç mimarlık hizmeti, sadece güzel görünüm değil, aynı zamanda fonksiyonel ve ergonomik mekanlar yaratmaktır. İzmir'de deneyimli iç mimar ekibimiz, evinizi veya iş yerinizi ihtiyaçlarınıza göre tasarlar.",
        "3D görselleştirme teknolojisiyle projenizi uygulama başlamadan önce görme imkanı sunuyoruz. Renk seçenekleri, mobilya yerleşimi, aydınlatma planı ve malzeme önerileri dahil her detayı birlikte planlıyoruz.",
        "İster yeni bir ev satın aldınız ister mevcut evinizi yenilemek istiyorsunuz, iç mimarlık hizmetimizle doğru kararlar vermenize yardımcı oluyoruz. Ücretsiz ön görüşme için bize ulaşın.",
      ]}
    />
  );
};

export default IcMimarlik;
