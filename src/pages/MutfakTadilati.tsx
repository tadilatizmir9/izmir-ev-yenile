import ServicePageTemplate from "@/components/ServicePageTemplate";
import serviceMutfak from "@/assets/service-mutfak.jpg";

const MutfakTadilati = () => {
  return (
    <ServicePageTemplate
      title="İzmir Mutfak Tadilatı"
      description="Hayalinizdeki mutfağı birlikte tasarlayalım. Modern dolaplar, kaliteli tezgahlar ve fonksiyonel alanlar için profesyonel çözümler."
      metaTitle="Mutfak Tadilatı İzmir | Profesyonel Mutfak Yenileme Hizmeti"
      image={serviceMutfak}
      content={[
        "Mutfağınız evinizin kalbidir. İzmir'de mutfak tadilatı konusunda uzmanlaşmış ekibimiz, size modern, ergonomik ve estetik mutfaklar sunuyor. Dolap yenileme, tezgah değişimi, fayans döşeme ve aydınlatma dahil her detayı düşünüyoruz.",
        "İster mevcut mutfağınızı yenilemek isteyin, ister tamamen yeni bir tasarım hayal edin, iç mimar desteğiyle projenizi hayata geçiriyoruz. 3D görselleştirme sayesinde mutfağınızı tamamlanmadan önce görme imkanı sunuyoruz.",
        "Anlaşmalı tedarikçilerimiz sayesinde kaliteli malzemeleri uygun fiyatlarla temin ediyoruz. Zamanında teslim sözleşmesi ve 2 yıl işçilik garantisi ile güvenle çalışabilirsiniz.",
      ]}
    />
  );
};

export default MutfakTadilati;
