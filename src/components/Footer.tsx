import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE_NAME, CONTACT, SERVICE_AREAS } from "@/config/siteConfig";

const Footer = () => {
  const locationLinks = [
    { name: "Bornova Tadilat", href: "/bornova-tadilat" },
    { name: "Karşıyaka Tadilat", href: "/karsiyaka-tadilat" },
    { name: "Buca Tadilat", href: "/buca-tadilat" },
    { name: "Alsancak Tadilat", href: "/alsancak-tadilat" },
    { name: "Konak Tadilat", href: "/konak-tadilat" },
    { name: "Gaziemir Tadilat", href: "/gaziemir-tadilat" },
    { name: "Mavişehir Tadilat", href: "/mavisehir-tadilat" },
    { name: "Narlıdere Tadilat", href: "/narlidere-tadilat" },
    { name: "Urla Tadilat", href: "/urla-tadilat" },
    { name: "Çeşme Tadilat", href: "/cesme-tadilat" },
    { name: "Güzelbahçe Tadilat", href: "/guzelbahce-tadilat" },
    { name: "Bayraklı Tadilat", href: "/bayrakli-tadilat" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary">Tadilat</span>
              <span className="text-2xl font-display font-light">İzmir</span>
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-background/80">
              <p className="font-semibold">Tadilat İzmir – Profesyonel Tadilat Çözüm Ortağı Ağı</p>
              <p>
                İzmir genelinde mutfak, banyo, komple ev tadilatı ve iç mimari çözümler sunan uzman ekiplere
                yönlendirme hizmeti.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm leading-relaxed text-background/80">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>İzmir, Türkiye</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Telefon / WhatsApp: {CONTACT.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>E-posta: {CONTACT.email}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-background/10 pt-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-3">Hizmet Verilen İlçeler</h3>
            <ul className="flex flex-wrap gap-2 text-sm text-background/80">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="bg-background/10 text-background rounded-full px-3 py-1">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-3">Lokasyon Sayfaları</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {locationLinks.map((loc) => (
                <li key={loc.href}>
                  <Link
                    to={loc.href}
                    className="text-background/80 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/80" />
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-background/60">
          <p>© 2024 {SITE_NAME}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              E-posta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
