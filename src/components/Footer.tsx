import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE_NAME, CONTACT, SERVICES, SERVICE_AREAS } from "@/config/siteConfig";

const Footer = () => {
  const services = [
    { name: SERVICES[0], href: "/mutfak-tadilati" },
    { name: SERVICES[1], href: "/banyo-tadilati" },
    { name: SERVICES[2], href: "/komple-ev-tadilati" },
    { name: SERVICES[3], href: "/ic-mimarlik" },
  ];

  const locations = [
    { name: `${SERVICE_AREAS[0]} Tadilat`, href: "/bornova-tadilat" },
    { name: `${SERVICE_AREAS[1]} Tadilat`, href: "/karsiyaka-tadilat" },
    { name: `${SERVICE_AREAS[2]} Tadilat`, href: "/buca-tadilat" },
    { name: `${SERVICE_AREAS[4]} Tadilat`, href: "/konak-tadilat" },
    { name: `${SERVICE_AREAS[7]} Tadilat`, href: "/alsancak-tadilat" },
    { name: `${SERVICE_AREAS[8]} Tadilat`, href: "/gaziemir-tadilat" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary">Tadilat</span>
              <span className="text-2xl font-display font-light">İzmir</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              İzmir'de iç mimar eşliğinde tadilat ve dekorasyon hizmeti. Mutfak, banyo ve komple ev
              tadilatında profesyonel çözümler.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Hizmet Bölgeleri</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.name}>
                  <Link
                    to={location.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center space-x-3 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center space-x-3 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} {SITE_NAME}. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-background/50 hover:text-primary transition-colors text-sm"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="#"
                className="text-background/50 hover:text-primary transition-colors text-sm"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
