import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME, CONTACT } from "@/config/siteConfig";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Ana Sayfa", href: "/", isHash: false },
    { name: "Hizmetler", href: "hizmetler", isHash: true },
    { name: "Projeler", href: "projeler", isHash: true },
    { name: "Hakkımızda", href: "/hakkimizda", isHash: false },
    { name: "Blog", href: "/blog", isHash: false },
    { name: "İletişim", href: "iletisim", isHash: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href;
  };

  const handleNavClick = (item: { href: string; isHash: boolean }) => {
    setIsOpen(false);

    if (item.isHash) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-1.5">
            <img src="/favicon.png" alt={`${SITE_NAME} Logo`} className="w-9 h-9" />
            <span className="text-2xl font-display font-bold text-primary">Tadilat</span>
            <span className="text-2xl font-display font-light text-foreground">İzmir</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) =>
              item.isHash ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-medium transition-colors hover:text-primary text-foreground/80`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <Button asChild>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                Teklif Al
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menüyü aç"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) =>
                item.isHash ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground/80 text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Button asChild className="w-full">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp ile Teklif Al
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
