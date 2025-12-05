import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/config/siteConfig";

const WhatsAppButton = () => {
  // Detect if user is on mobile device
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Use wa.me for mobile (opens app) or web.whatsapp.com for desktop
  const getWhatsAppUrl = () => {
    const message = encodeURIComponent(CONTACT.whatsappMessage);
    if (isMobile()) {
      // Mobile: use wa.me to open WhatsApp app
      return `${CONTACT.whatsapp}?text=${message}`;
    } else {
      // Desktop: use web.whatsapp.com
      const phoneNumber = CONTACT.phone.replace(/\s/g, "").replace("+", "");
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5C] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
