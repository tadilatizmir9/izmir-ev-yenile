/**
 * Calculate estimated reading time for blog post content
 * Assumes average reading speed of 200 words per minute
 */
export const calculateReadingTime = (content: string): number => {
  // Remove HTML tags and get text content
  const textContent = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Count words (split by spaces)
  const wordCount = textContent.split(/\s+/).filter((word) => word.length > 0).length;

  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, readingTime);
};

/**
 * Generate a clean, SEO-friendly slug from a title
 * Handles Turkish characters and ensures URL-safe format
 */
export const generateSlug = (title: string): string => {
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

/**
 * Get excerpt from content if no excerpt is provided
 * Extracts first 160 characters of plain text
 */
export const getExcerpt = (content: string, maxLength: number = 160): string => {
  const textContent = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength).trim() + "...";
};



