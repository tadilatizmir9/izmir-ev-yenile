import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/admin/RichTextEditor";

const EDITABLE_PAGES = [
  { slug: "mutfak-tadilati", label: "Mutfak Tadilatı" },
  { slug: "banyo-tadilati", label: "Banyo Tadilatı" },
  { slug: "komple-ev-tadilati", label: "Komple Ev Tadilatı" },
  { slug: "ic-mimarlik", label: "İç Mimarlık" },
  { slug: "bornova-tadilat", label: "Bornova Tadilat" },
  { slug: "karsiyaka-tadilat", label: "Karşıyaka Tadilat" },
  { slug: "buca-tadilat", label: "Buca Tadilat" },
  { slug: "konak-tadilat", label: "Konak Tadilat" },
  { slug: "alsancak-tadilat", label: "Alsancak Tadilat" },
  { slug: "gaziemir-tadilat", label: "Gaziemir Tadilat" },
  { slug: "mavisehir-tadilat", label: "Mavişehir Tadilat" },
  { slug: "narlidere-tadilat", label: "Narlıdere Tadilat" },
  { slug: "urla-tadilat", label: "Urla Tadilat" },
  { slug: "cesme-tadilat", label: "Çeşme Tadilat" },
  { slug: "guzelbahce-tadilat", label: "Güzelbahçe Tadilat" },
  { slug: "bayrakli-tadilat", label: "Bayraklı Tadilat" },
] as const;

type EditableSlug = (typeof EDITABLE_PAGES)[number]["slug"];

interface PageContent {
  id?: string;
  slug: string;
  title: string | null;
  heading: string | null;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

type PageContentRow = {
  id?: string;
  slug: string;
  title: string | null;
  heading: string | null;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at?: string;
  updated_at?: string;
};

const emptyPageContent: PageContent = {
  slug: "",
  title: "",
  heading: "",
  body: "",
  meta_title: "",
  meta_description: "",
};

const AdminPages = () => {
  const { toast } = useToast();
  const [selectedSlug, setSelectedSlug] = useState<EditableSlug>(EDITABLE_PAGES[0].slug);
  const [pageData, setPageData] = useState<PageContent>(emptyPageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectedPageLabel = useMemo(
    () => EDITABLE_PAGES.find((p) => p.slug === selectedSlug)?.label || selectedSlug,
    [selectedSlug]
  );

  const loadPage = async (slug: EditableSlug) => {
    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase
        .from("page_content" as any)
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;

      const row = data as unknown as PageContentRow | null;
      if (row) {
        setPageData({
          id: row.id,
          slug: row.slug,
          title: row.title,
          heading: row.heading,
          body: row.body,
          meta_title: row.meta_title,
          meta_description: row.meta_description,
        });
      } else {
        setPageData({
          ...emptyPageContent,
          slug,
        });
      }
    } catch (error) {
      console.error("Sayfa içeriği yüklenirken hata:", error);
      toast({
        title: "Hata",
        description: "Sayfa içeriği yüklenemedi.",
        variant: "destructive",
      });
      setPageData({ ...emptyPageContent, slug });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(selectedSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const payload = {
        slug: selectedSlug,
        title: pageData.title && pageData.title.trim() !== "" ? pageData.title.trim() : null,
        heading: pageData.heading && pageData.heading.trim() !== "" ? pageData.heading.trim() : null,
        body: pageData.body && pageData.body.trim() !== "" ? pageData.body.trim() : null,
        meta_title:
          pageData.meta_title && pageData.meta_title.trim() !== "" ? pageData.meta_title.trim() : null,
        meta_description:
          pageData.meta_description && pageData.meta_description.trim() !== ""
            ? pageData.meta_description.trim()
            : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("page_content" as any).upsert(payload, { onConflict: "slug" });
      if (error) throw error;

      toast({ title: "Kaydedildi", description: "Sayfa içeriği kaydedildi." });
    } catch (error) {
      console.error("Sayfa kaydedilirken hata:", error);
      toast({
        title: "Hata",
        description: "Sayfa kaydedilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Sayfa İçerikleri</h1>
          <p className="text-muted-foreground mt-1">Hizmet ve lokasyon sayfalarının içeriklerini yönetin</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Sayfalar</CardTitle>
            <CardDescription>Düzenlemek için bir sayfa seçin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {EDITABLE_PAGES.map((page) => (
              <Button
                key={page.slug}
                variant={page.slug === selectedSlug ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedSlug(page.slug)}
                disabled={loading && page.slug !== selectedSlug}
              >
                {page.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedPageLabel}</CardTitle>
            <CardDescription>İçeriği güncelleyin ve meta bilgilerini ekleyin</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={selectedSlug} readOnly className="bg-muted/50" />
                </div>

                <div className="space-y-2">
                  <Label>Başlık (Admin için opsiyonel)</Label>
                  <Input
                    value={pageData.title || ""}
                    onChange={(e) => setPageData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Admin başlığı"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sayfa Başlığı (H1 override - opsiyonel)</Label>
                  <Input
                    value={pageData.heading || ""}
                    onChange={(e) => setPageData((prev) => ({ ...prev, heading: e.target.value }))}
                    placeholder="Sayfa üzerindeki ana başlık"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Meta Başlık (SEO)</Label>
                    <Input
                      value={pageData.meta_title || ""}
                      onChange={(e) => setPageData((prev) => ({ ...prev, meta_title: e.target.value }))}
                      placeholder="Meta title"
                    />
                    <p className="text-xs text-muted-foreground">Google arama sonuçlarında başlık olarak görünecek.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Açıklama (SEO)</Label>
                    <Textarea
                      value={pageData.meta_description || ""}
                      onChange={(e) =>
                        setPageData((prev) => ({ ...prev, meta_description: e.target.value }))
                      }
                      placeholder="Meta description"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Google arama sonuçlarında görünecek açıklama (önerilen 120–160 karakter).
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <RichTextEditor
                    value={pageData.body || ""}
                    onChange={(html) => setPageData((prev) => ({ ...prev, body: html }))}
                    label="Sayfa İçeriği"
                    placeholder="Sayfa içeriğini yazın..."
                  />
                </div>

                <Button onClick={handleSave} disabled={saving} className={cn("w-full sm:w-auto")}>
                  {saving ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Kaydet"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export default AdminPages;


