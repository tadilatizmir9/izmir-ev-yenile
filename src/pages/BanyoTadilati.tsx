import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceBanyo from "@/assets/service-banyo.jpg";

const BanyoTadilati = () => {
  return (
    <ServicePageTemplate
      title="İzmir Banyo Tadilatı"
      description="Profesyonel ekibimizle banyonuzu modern ve fonksiyonel bir alana dönüştürüyoruz. Sızdırmaz ve kaliteli işçilik garantisi."
      metaTitle="Banyo Tadilatı İzmir | Profesyonel Banyo Yenileme Hizmeti"
      image={serviceBanyo}
      content={[
        "İzmir'de banyo tadilatı hizmeti veren ekibimiz, yıllardır pek çok eve yeni banyolar kazandırdı. Seramik döşeme, tesisat yenileme, duş kabini kurulumu ve armatür değişimi dahil tüm işlemleri profesyonelce gerçekleştiriyoruz.",
        "Banyonuzda su kaçağı, rutubet veya eskimiş görünüm mü var? Deneyimli ustalarımız sorunu kökten çözer ve size modern, hijyenik ve kullanışlı bir banyo sunar. A sınıfı malzemeler kullanıyor, 2 yıl işçilik garantisi veriyoruz.",
        "İzmir genelinde ücretsiz keşif yapıyoruz. Yerinde ölçüm alıp, ihtiyaçlarınızı dinliyor ve size detaylı bir fiyat teklifi sunuyoruz. Sürpriz maliyet yok, her şey yazılı ve net.",
      ]}
    />
  );
};

export default BanyoTadilati;
