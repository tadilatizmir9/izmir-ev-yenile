import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_SLUGS, SERVICE_AREAS } from "@/config/siteConfig";

interface FormErrors {
  name?: string;
  phone?: string;
  district?: string;
  type?: string;
  details?: string;
  honeypot?: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    type: "",
    details: "",
    honeypot: "", // Hidden field to catch bots
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Validate Turkish phone number (10-11 digits, ignore spaces and dashes)
  const validateTurkishPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    const digitsOnly = cleaned.replace(/\D/g, "");
    return digitsOnly.length >= 10 && digitsOnly.length <= 11;
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Ad soyad gereklidir";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Ad soyad en fazla 100 karakter olabilir";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası gereklidir";
    } else if (!validateTurkishPhone(formData.phone)) {
      newErrors.phone = "Geçerli bir Türkiye telefon numarası giriniz (10-11 haneli)";
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Telefon numarası en fazla 20 karakter olabilir";
    }

    // District validation (now required)
    if (!formData.district.trim()) {
      newErrors.district = "İlçe/mahalle bilgisi gereklidir";
    }

    // Type validation
    if (!formData.type) {
      newErrors.type = "Tadilat türü seçimi gereklidir";
    }

    // Details validation (now required)
    if (!formData.details.trim()) {
      newErrors.details = "Proje detayı gereklidir";
    } else if (formData.details.trim().length > 800) {
      newErrors.details = "Proje detayı en fazla 800 karakter olabilir";
    }

    // Honeypot check (if filled, it's a bot)
    if (formData.honeypot) {
      newErrors.honeypot = "Spam tespit edildi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form Hatası",
        description: "Lütfen formdaki hataları düzeltin.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        district: formData.district.trim() || null,
        renovation_type: formData.type,
        details: formData.details.trim() || null,
      });

      if (error) {
        console.error("Form submission error:", error);
        toast({
          title: "Hata",
          description: "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitted(true);
      toast({
        title: "Talebiniz Alındı",
        description: "Aynı gün içinde sizinle iletişime geçeceğiz.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id="iletisim"
        className="py-20 md:py-28 bg-background"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
              role="img"
              aria-label="Başarılı"
            >
              <CheckCircle className="w-10 h-10 text-accent" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Talebinizi Aldık!
            </h2>
            <p className="text-muted-foreground text-lg">
              Aynı gün içinde sizinle iletişime geçeceğiz. Acil bir durum için WhatsApp'tan bize
              ulaşabilirsiniz.
            </p>
            <Button
              className="mt-8"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  district: "",
                  type: "",
                  details: "",
                  honeypot: "",
                });
                setErrors({});
              }}
            >
              Yeni Talep Oluştur
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="iletisim" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ücretsiz Keşif ve Teklif Formu
              </h2>
              <p className="text-muted-foreground text-lg">
                Formu doldurun, aynı gün içinde sizi arayalım. Ücretsiz keşif yapıp detaylı fiyat
                teklifi sunalım.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Neden Bizi Tercih Etmelisiniz?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>İzmir geneli ücretsiz keşif</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Şeffaf ve detaylı fiyat teklifi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>2 yıl işçilik garantisi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Profesyonel iç mimar desteği</span>
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
          >
            {/* Honeypot field - hidden from users, visible to bots */}
            <div
              className="absolute opacity-0 pointer-events-none h-0 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">Website (boş bırakın)</label>
              <Input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Ad Soyad *
              </label>
              <Input
                id="name"
                placeholder="Adınız ve soyadınız"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  // Clear error when user starts typing
                  if (errors.name) {
                    const { name: _name, ...restErrors } = errors;
                    setErrors(restErrors);
                  }
                }}
                maxLength={100}
                required
                disabled={isLoading}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefon *
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="0500 000 00 00"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  // Clear error when user starts typing
                  if (errors.phone) {
                    const { phone: _phone, ...restErrors } = errors;
                    setErrors(restErrors);
                  }
                }}
                maxLength={20}
                required
                disabled={isLoading}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="district" className="text-sm font-medium text-foreground">
                İlçe / Mahalle *
              </label>
              <Input
                id="district"
                placeholder={`Örn: ${SERVICE_AREAS[0]}, Atatürk Mahallesi`}
                value={formData.district}
                onChange={(e) => {
                  setFormData({ ...formData, district: e.target.value });
                  // Clear error when user starts typing
                  if (errors.district) {
                    const { district: _district, ...restErrors } = errors;
                    setErrors(restErrors);
                  }
                }}
                required
                disabled={isLoading}
                className={errors.district ? "border-destructive" : ""}
              />
              {errors.district && (
                <p className="text-sm text-destructive mt-1">{errors.district}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-foreground">
                Tadilat Türü *
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) => {
                  setFormData({ ...formData, type: value });
                  // Clear error when user selects
                  if (errors.type) {
                    const { type: _type, ...restErrors } = errors;
                    setErrors(restErrors);
                  }
                }}
                disabled={isLoading}
              >
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="mutfak">{SERVICE_SLUGS.mutfak}</SelectItem>
                  <SelectItem value="banyo">{SERVICE_SLUGS.banyo}</SelectItem>
                  <SelectItem value="komple">{SERVICE_SLUGS.komple}</SelectItem>
                  <SelectItem value="diger">{SERVICE_SLUGS.diger}</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive mt-1">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium text-foreground">
                Proje Detayı *
              </label>
              <Textarea
                id="details"
                placeholder="Projeniz hakkında kısa bilgi verin..."
                rows={4}
                value={formData.details}
                onChange={(e) => {
                  setFormData({ ...formData, details: e.target.value });
                  // Clear error when user starts typing
                  if (errors.details) {
                    const { details: _details, ...restErrors } = errors;
                    setErrors(restErrors);
                  }
                }}
                maxLength={800}
                required
                disabled={isLoading}
                className={errors.details ? "border-destructive" : ""}
              />
              <div className="flex justify-between items-center">
                {errors.details ? (
                  <p className="text-sm text-destructive">{errors.details}</p>
                ) : (
                  <span></span>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.details.length}/800 karakter
                </p>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || !!formData.honeypot}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Ücretsiz Keşif Talep Et
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Bilgileriniz gizli tutulur ve sadece sizinle iletişim için kullanılır.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
