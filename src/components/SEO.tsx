import { useEffect } from "react";
import { SITE_NAME, SITE_URL, DEFAULT_SEO } from "@/config/siteConfig";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  // Legacy props for backwards compatibility
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: object;
}

/**
 * SEO component that dynamically updates meta tags for better search engine optimization
 * Supports both new prop names (title, description, image, url, type, jsonLd) and legacy props
 */
export const SEO = ({
  title,
  description,
  image,
  url,
  type = "website",
  jsonLd,
  // Legacy props
  canonicalUrl,
  ogImage,
  ogType,
  twitterCard = "summary_large_image",
  structuredData,
}: SEOProps) => {
  const siteName = SITE_NAME;
  const siteUrl = SITE_URL;
  const defaultTitle = DEFAULT_SEO.title;
  const defaultDescription = DEFAULT_SEO.description;
  const defaultImage = `${siteUrl}/favicon.png`;

  // Use new props if provided, otherwise fall back to legacy props
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonicalUrl = url || canonicalUrl || siteUrl;
  const finalOgImage = image || ogImage || defaultImage;
  const finalOgType = type || ogType || "website";
  const finalJsonLd = jsonLd || structuredData;
  const fullOgImage = finalOgImage.startsWith("http") ? finalOgImage : `${siteUrl}${finalOgImage}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update or create property tags (for Open Graph)
    const updatePropertyTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", finalDescription);
    updateMetaTag("author", siteName);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", finalCanonicalUrl);

    // Open Graph tags
    updatePropertyTag("og:title", finalTitle);
    updatePropertyTag("og:description", finalDescription);
    updatePropertyTag("og:type", finalOgType);
    updatePropertyTag("og:url", finalCanonicalUrl);
    updatePropertyTag("og:image", fullOgImage);
    updatePropertyTag("og:site_name", siteName);
    updatePropertyTag("og:locale", "tr_TR");

    // Twitter Card tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", finalTitle);
    updateMetaTag("twitter:description", finalDescription);
    updateMetaTag("twitter:image", fullOgImage);

    // Structured Data (JSON-LD)
    if (finalJsonLd) {
      // Remove existing structured data scripts if any
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-seo]');
      existingScripts.forEach((script) => script.remove());

      // Support both single object and array of objects
      const jsonLdArray = Array.isArray(finalJsonLd) ? finalJsonLd : [finalJsonLd];

      jsonLdArray.forEach((jsonLd, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "true");
        script.setAttribute("data-seo-index", index.toString());
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
      });
    }
  }, [
    finalTitle,
    finalDescription,
    finalCanonicalUrl,
    fullOgImage,
    finalOgType,
    twitterCard,
    finalJsonLd,
    siteName,
  ]);

  return null; // This component doesn't render anything
};
