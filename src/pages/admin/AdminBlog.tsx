import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

  // Import slug generation utility
  // Note: We'll use the utility function from lib/blog-utils
  const generateSlug = (title: string) => {
    return (
      title
        .toLowerCase()
        .trim()
        // Replace Turkish characters
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
        // Replace spaces and special characters with hyphens
        .replace(/[^a-z0-9]+/g, "-")
        // Remove leading and trailing hyphens
        .replace(/(^-|-$)/g, "")
        // Limit length to 100 characters for SEO
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
    if (!editingPost?.title || !editingPost?.slug || !editingPost?.content) {
      toast({
        title: "Hata",
        description: "Başlık, slug ve içerik zorunludur.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");

      if (editingPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: editingPost.title,
            slug: editingPost.slug,
            content: editingPost.content,
            excerpt: editingPost.excerpt,
            featured_image: editingPost.featured_image,
            meta_title: editingPost.meta_title,
            meta_description: editingPost.meta_description,
            published: editingPost.published,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ title: "Başarılı", description: "Blog yazısı güncellendi." });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: editingPost.title,
          slug: editingPost.slug,
          content: editingPost.content,
          excerpt: editingPost.excerpt,
          featured_image: editingPost.featured_image,
          meta_title: editingPost.meta_title,
          meta_description: editingPost.meta_description,
          published: editingPost.published,
        });

        if (error) throw error;
        toast({ title: "Başarılı", description: "Blog yazısı oluşturuldu." });
      }

      setDialogOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      const errorMessage = error instanceof Error ? error.message : "İşlem başarısız.";
      toast({ title: "Hata", description: errorMessage, variant: "destructive" });
    } finally {
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
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {post.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[150px] truncate">
                      /{post.slug}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

              <div className="space-y-2">
                <Label htmlFor="content">İçerik *</Label>
                <Textarea
                  id="content"
                  value={editingPost.content || ""}
                  onChange={(e) => setEditingPost((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Blog yazısı içeriği..."
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">Kapak Görseli URL</Label>
                <Input
                  id="featured_image"
                  value={editingPost.featured_image || ""}
                  onChange={(e) =>
                    setEditingPost((prev) => ({ ...prev, featured_image: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Başlık (SEO)</Label>
                  <Input
                    id="meta_title"
                    value={editingPost.meta_title || ""}
                    onChange={(e) =>
                      setEditingPost((prev) => ({ ...prev, meta_title: e.target.value }))
                    }
                    placeholder="SEO başlığı"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Açıklama (SEO)</Label>
                  <Input
                    id="meta_description"
                    value={editingPost.meta_description || ""}
                    onChange={(e) =>
                      setEditingPost((prev) => ({ ...prev, meta_description: e.target.value }))
                    }
                    placeholder="SEO açıklaması"
                  />
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
