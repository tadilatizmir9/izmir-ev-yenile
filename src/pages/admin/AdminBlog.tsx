import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
}

const defaultPost = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featured_image: "",
  meta_title: "",
  meta_description: "",
  published: false,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({ title: "Hata", description: "Blog yazıları yüklenemedi.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateSlug = (title: string) => {
    return (
      title
        .toLowerCase()
        .trim()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/Ğ/g, "g")
        .replace(/Ü/g, "u")
        .replace(/Ş/g, "s")
        .replace(/İ/g, "i")
        .replace(/Ö/g, "o")
        .replace(/Ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 100)
    );
  };

  const handleTitleChange = (title: string) => {
    setEditingPost((prev) => ({
      ...prev,
      title,
      slug: prev?.slug || generateSlug(title),
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!editingPost?.title?.trim() || !editingPost?.slug?.trim()) {
      toast({
        title: "Hata",
        description: "Başlık ve slug zorunludur.",
        variant: "destructive",
      });
      return;
    }

    // Validate content - check if it's not just empty HTML tags
    const content = editingPost?.content?.trim() || "";
    const hasContent =
      content &&
      content !== "<p></p>" &&
      content !== "<p><br></p>" &&
      content !== "<p><br/></p>" &&
      content.replace(/<[^>]*>/g, "").trim().length > 0;

    if (!hasContent) {
      toast({
        title: "Hata",
        description: "İçerik zorunludur. Lütfen blog yazısı içeriğini girin.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");

      // Prepare payload - featured_image: empty string -> null, non-empty -> trimmed string
      // NO validation, NO preloading, NO async checks - completely non-blocking
      const featuredImage =
        editingPost.featured_image && editingPost.featured_image.trim() !== ""
          ? editingPost.featured_image.trim()
          : null;

      const payload = {
        title: editingPost.title.trim(),
        slug: editingPost.slug.trim(),
        content: editingPost.content.trim(),
        excerpt: editingPost.excerpt?.trim() || null,
        featured_image: featuredImage, // Always null or trimmed string - no validation
        meta_title: editingPost.meta_title?.trim() || null,
        meta_description: editingPost.meta_description?.trim() || null,
        published: editingPost.published || false,
      };

      let result;
      if (editingPost.id) {
        // Update existing post
        result = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", editingPost.id)
          .select()
          .single();
      } else {
        // Insert new post
        result = await supabase.from("blog_posts").insert(payload).select().single();
      }

      // Check for error - if error exists, show toast and return early
      if (result.error) {
        let errorMessage = "İşlem başarısız.";
        if (result.error.code === "23505") {
          errorMessage = "Bu slug zaten kullanılıyor. Lütfen farklı bir slug girin.";
        } else if (result.error.message) {
          errorMessage = `Blog kaydedilirken bir hata oluştu: ${result.error.message}`;
        }

        toast({
          variant: "destructive",
          title: "Hata",
          description: errorMessage,
        });

        // Return early - do NOT proceed to success branch
        return;
      }

      // SUCCESS BRANCH - only reached if error is null
      toast({
        title: "Başarılı",
        description: editingPost.id
          ? "Blog yazısı başarıyla güncellendi."
          : "Blog yazısı başarıyla kaydedildi.",
      });

      // Close dialog and reset form state
      setDialogOpen(false);
      setEditingPost(null);

      // Refresh the posts list (don't await to avoid blocking)
      fetchPosts().catch((err) => {
        console.error("Error refreshing posts list:", err);
      });
    } catch (error) {
      // Catch any unexpected errors (network issues, etc.)
      console.error("Unexpected blog save error:", error);

      let errorMessage = "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = String(error.message);
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        variant: "destructive",
        title: "Hata",
        description: errorMessage,
      });
    } finally {
      // THIS MUST ALWAYS RUN - ensures spinner stops even if there's an error
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("blog_posts").delete().eq("id", postToDelete.id);

      if (error) throw error;

      toast({ title: "Başarılı", description: "Blog yazısı silindi." });
      setDeleteDialogOpen(false);
      setPostToDelete(null);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({ title: "Hata", description: "Silme işlemi başarısız.", variant: "destructive" });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Blog Yazıları</h1>
          <p className="text-muted-foreground mt-1">
            Blog yazılarını ekleyin, düzenleyin veya silin
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingPost(defaultPost);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Yazı
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yazılar</CardTitle>
          <CardDescription>
            Toplam {posts.length} yazı, {posts.filter((p) => p.published).length} yayında
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Henüz blog yazısı bulunmamaktadır.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Durum</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Görsel</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" /> Yayında
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" /> Taslak
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{post.title}</span>
                        {(post.meta_title || post.meta_description) && (
                          <Badge variant="outline" className="text-xs">
                            SEO
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[150px] truncate">
                      /{post.slug}
                    </TableCell>
                    <TableCell>
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            // Hide broken images
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(post.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPostToDelete(post);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost?.id ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
            </DialogTitle>
            <DialogDescription>Blog yazısı bilgilerini doldurun</DialogDescription>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    value={editingPost.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Blog yazısı başlığı"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={editingPost.slug || ""}
                    onChange={(e) => setEditingPost((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="blog-yazisi-url"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Özet</Label>
                <Textarea
                  id="excerpt"
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Kısa özet..."
                  rows={2}
                />
              </div>

              <RichTextEditor
                value={editingPost.content || ""}
                onChange={(html) => setEditingPost((prev) => ({ ...prev, content: html }))}
                label="İçerik *"
                placeholder="Buraya blog yazınızı yazmaya başlayın…"
              />

              <div className="space-y-2">
                <Label htmlFor="featured_image">Kapak Görseli URL</Label>
                <Input
                  id="featured_image"
                  type="text"
                  value={editingPost.featured_image || ""}
                  onChange={(e) =>
                    setEditingPost((prev) => ({ ...prev, featured_image: e.target.value }))
                  }
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Herhangi bir URL girebilirsiniz. Doğrulama yapılmaz.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Başlık (SEO)</Label>
                  <Input
                    id="meta_title"
                    type="text"
                    value={editingPost.meta_title || ""}
                    onChange={(e) =>
                      setEditingPost((prev) => ({ ...prev, meta_title: e.target.value }))
                    }
                    placeholder="SEO başlığı"
                  />
                  <p className="text-xs text-muted-foreground">
                    Google arama sonuçlarında başlık olarak görünecek.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Açıklama (SEO)</Label>
                  <Textarea
                    id="meta_description"
                    value={editingPost.meta_description || ""}
                    onChange={(e) =>
                      setEditingPost((prev) => ({ ...prev, meta_description: e.target.value }))
                    }
                    placeholder="SEO açıklaması"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Google arama sonuçlarında görünecek açıklama (önerilen 120–160 karakter).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={editingPost.published || false}
                  onCheckedChange={(checked) =>
                    setEditingPost((prev) => ({ ...prev, published: checked }))
                  }
                />
                <Label htmlFor="published">Yayınla</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                "Kaydet"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Blog yazısını silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              "{postToDelete?.title}" başlıklı yazı kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlog;

/**
 * ADMIN BLOG EDITOR - REBUILT WITH REACT-QUILL
 *
 * This admin blog editor has been completely rebuilt for reliability and simplicity.
 *
 * EDITOR:
 * - Uses React-Quill for rich text editing
 * - Supports: H1, H2, H3, bold, italic, underline, bullet list, numbered list, links
 * - Outputs HTML that is saved directly to Supabase
 * - Component: src/components/admin/RichTextEditor.tsx
 *
 * FORM FIELDS:
 * - title (required): Blog post title
 * - slug (required): URL-friendly slug (auto-generated from title)
 * - excerpt (optional): Short summary
 * - content (required): HTML content from React-Quill editor
 * - featured_image (optional): Image URL - completely non-blocking, no validation
 *
 * FEATURED IMAGE FIX:
 * - The featured_image field is completely non-blocking
 * - NO validation, NO preloading, NO async checks
 * - Empty string ("") is converted to null
 * - Non-empty string is trimmed and sent as-is
 * - Form ALWAYS submits on first try, regardless of URL validity
 * - Network request is ALWAYS sent to Supabase
 *
 * SAVE FLOW:
 * - Validates required fields (title, slug, content)
 * - Builds payload with normalized values (empty strings -> null)
 * - Uses .select().single() to ensure promise resolves correctly
 * - Checks error FIRST and returns early if error exists
 * - Success branch only executes when error is null
 * - Finally block ALWAYS runs to clear loading state
 * - Dialog closes and form resets on successful save
 * - Blog list refreshes after save
 *
 * BLOG LIST:
 * - Displays all blog posts in a table
 * - Shows: status, title, slug, featured image thumbnail, date, actions
 * - Fetches on mount and after successful save
 * - Supports edit and delete operations
 *
 * RESULT:
 * - Clean, reliable, maintainable code
 * - No blocking logic for featured image
 * - Always submits successfully on first try
 * - Loading state always clears
 * - Network requests always sent
 * - React-Quill provides stable, user-friendly editing experience
 */
