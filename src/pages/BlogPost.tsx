import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { calculateReadingTime, getExcerpt } from "@/lib/blog-utils";
import { SITE_NAME, SITE_URL, CONTACT } from "@/config/siteConfig";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error: queryError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .limit(1)
        .single();

      if (queryError) {
        throw new Error(queryError.message || "Blog yazısı yüklenemedi");
      }

      return data;
    },
    enabled: !!slug,
  });

  // Calculate reading time and prepare SEO data
  const readingTime = post ? calculateReadingTime(post.content) : 0;
  const postUrl = post ? `${SITE_URL}/blog/${post.slug}` : SITE_URL;
  const postImage = post?.featured_image || `${SITE_URL}/favicon.png`;
  const fullPostImage = postImage.startsWith("http") ? postImage : `${SITE_URL}${postImage}`;

  // Prepare Article/BlogPosting structured data for SEO
  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || getExcerpt(post.content),
        articleBody: getExcerpt(post.content, 500), // Plain text excerpt for articleBody
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/favicon.png`,
          },
        },
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        image: fullPostImage,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
      }
    : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <article className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Skeleton className="h-8 w-32 mb-8" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-6 w-48 mb-8" />
              <Skeleton className="h-80 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Blog yazısı bulunamadı</h1>
            <p className="text-muted-foreground mb-8">
              Aradığınız blog yazısı mevcut değil veya yayından kaldırılmış olabilir.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <SEO
          title={post.meta_title || post.title}
          description={post.meta_description || post.excerpt || getExcerpt(post.content)}
          url={postUrl}
          image={fullPostImage}
          type="article"
          jsonLd={articleJsonLd}
        />
      )}
      <Header />

      <main className="pt-20 md:pt-24">
        <article className="py-16" itemScope itemType="https://schema.org/BlogPosting">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 -ml-4">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Blog'a Dön
              </Link>
            </Button>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6"
              itemProp="headline"
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.created_at} itemProp="datePublished">
                  {format(new Date(post.created_at), "d MMMM yyyy", { locale: tr })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} dakika okuma</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">{SITE_NAME}</span>
                </span>
              </div>
            </div>

            {post.featured_image && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  itemProp="image"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />

            <div className="mt-12 p-8 bg-primary/5 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Tadilat projeniz için uzman desteği alın
              </h3>
              <p className="text-muted-foreground mb-6">
                Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp ile İletişim
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`tel:${CONTACT.phone}`}>Hemen Ara</a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
