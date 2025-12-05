import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICE_AREAS } from "@/config/siteConfig";

const faqs = [
  {
    question: "Tadilat süreci ne kadar sürüyor?",
    answer:
      "Proje kapsamına göre değişmekle birlikte, banyo tadilatı 7-10 gün, mutfak tadilatı 10-15 gün, komple ev tadilatı ise 30-60 gün arasında tamamlanmaktadır. Keşif sonrası size net bir süre planı sunuyoruz ve sözleşmeyle bu süreyi garanti altına alıyoruz.",
  },
  {
    question: "Ödeme planı nasıl işliyor?",
    answer:
      "Genellikle %40 başlangıç, %30 ara ödeme ve %30 teslim sonrası ödeme şeklinde esnek bir plan sunuyoruz. Kredi kartına taksit seçeneklerimiz de mevcut. Ödeme planı projenize özel olarak düzenlenebilir.",
  },
  {
    question: "Ücretsiz keşif hangi ilçelerde geçerli?",
    answer: `İzmir'in tüm ilçelerinde ücretsiz keşif hizmeti sunuyoruz: ${SERVICE_AREAS.slice(0, 10).join(", ")} ve diğer tüm semtler dahil.`,
  },
  {
    question: "Malzemeleri siz mi temin ediyorsunuz?",
    answer:
      "Evet, malzeme temini tamamen bize ait. Anlaşmalı olduğumuz A sınıfı tedarikçilerden toptan fiyatlarla temin ediyoruz ve bu avantajı size yansıtıyoruz. İsterseniz kendi tercih ettiğiniz malzemeleri de kullanabiliriz.",
  },
  {
    question: "Proje başlamadan önce keşif yapıyor musunuz?",
    answer:
      "Kesinlikle. Her proje öncesinde ücretsiz yerinde keşif yapıyoruz. Keşifte ölçüler alınır, ihtiyaçlar belirlenir ve detaylı bir fiyat teklifi hazırlanır. 3D tasarım hizmeti de istemeniz halinde keşif sonrası sunulabilir.",
  },
  {
    question: "Garanti kapsamınız nedir?",
    answer:
      "Tüm işçilik için 2 yıl garanti sunuyoruz. Malzeme garantileri ise üretici garantisi kapsamındadır. Garanti süresince herhangi bir sorun yaşarsanız ücretsiz müdahale ediyoruz.",
  },
  {
    question: "Tadilat süresince evde kalmak mümkün mü?",
    answer:
      "Proje kapsamına göre değişir. Banyo veya mutfak gibi bölgesel tadilatlarsa evde kalabilirsiniz. Komple ev tadilatlarında genellikle geçici bir süre evden çıkmanız gerekebilir, bu konuda size önceden bilgi veriyoruz.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Sık Sorulan Sorular
          </h2>
          <p className="text-muted-foreground text-lg">
            Merak ettiklerinizin cevapları burada. Başka sorularınız varsa bize ulaşın.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
