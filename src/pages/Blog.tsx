import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { SITE_NAME, SITE_URL } from "@/config/siteConfig";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
}

const Blog = () => {
  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["published-blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error: queryError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (queryError) {
        throw new Error(queryError.message || "Blog yazıları yüklenemedi");
      }

      return data || [];
    },
  });

  const blogUrl = `${SITE_URL}/blog`;

  // Structured data for blog listing page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Tadilat ve dekorasyon hakkında güncel bilgiler, ipuçları ve ilham veren içerikler",
    url: blogUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog"
        description="Tadilat ve dekorasyon hakkında güncel bilgiler, ipuçları ve ilham veren içerikler"
        canonicalUrl={blogUrl}
        ogType="website"
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-20 md:pt-24" itemScope itemType="https://schema.org/Blog">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
                itemProp="name"
              >
                Blog
              </h1>
              <p className="text-lg text-muted-foreground" itemProp="description">
                Tadilat ve dekorasyon hakkında güncel bilgiler, ipuçları ve ilham veren içerikler
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isError && (
              <div className="text-center py-16">
                <p className="text-destructive text-lg">
                  Hata: {(error as Error)?.message || "Bilinmeyen hata"}
                </p>
              </div>
            )}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-lg transition-shadow group flex flex-col"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    itemProp="itemListElement"
                  >
                    <div className="p-4 pb-0">
                      <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            itemProp="image"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <span className="text-4xl font-display font-bold text-primary/30">
                              T
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.created_at} itemProp="datePublished">
                          {format(new Date(post.created_at), "d MMMM yyyy", { locale: tr })}
                        </time>
                      </div>
                      <CardTitle
                        className="line-clamp-2 group-hover:text-primary transition-colors"
                        itemProp="headline"
                      >
                        <Link to={`/blog/${post.slug}`} itemProp="url">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 mb-4" itemProp="description">
                          {post.excerpt}
                        </CardDescription>
                      )}
                      <Button
                        variant="ghost"
                        asChild
                        className="p-0 h-auto text-primary hover:text-primary/80"
                      >
                        <Link
                          to={`/blog/${post.slug}`}
                          className="flex items-center gap-2"
                          aria-label={`${post.title} yazısını oku`}
                        >
                          Devamını Oku
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Henüz yayınlanmış blog yazısı bulunmuyor.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
