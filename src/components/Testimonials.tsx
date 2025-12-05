import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ayşe K.",
    location: "Karşıyaka",
    text: "Mutfağımızı tamamen yenilediler. Söz verdikleri tarihte teslim ettiler ve fiyatta hiçbir sürpriz olmadı. Ekip çok profesyonel ve temiz çalıştı. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Mehmet Y.",
    location: "Bornova",
    text: "Komple ev tadilatı yaptırdık. İç mimar ekibiyle çalışmak büyük avantaj oldu. 3D tasarımla her şeyi önceden gördük. Sonuç beklentilerimizin üstündeydi.",
    rating: 5,
  },
  {
    name: "Fatma S.",
    location: "Buca",
    text: "Banyo tadilatında çok zorlandığımız bir dönemde Tadilat İzmir ekibi ile tanıştık. Su kaçağı sorunumuzu kökten çözdüler ve banyomuzu sıfırdan yenilediler. Çok memnunuz.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-muted-foreground text-lg">
            Yüzlerce mutlu müşterimizden bazı yorumlar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="relative overflow-hidden hover:shadow-lg transition-shadow border-border/50 bg-card"
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-10 h-10 text-primary/20" />
                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-1 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
