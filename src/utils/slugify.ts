/**
 * Utility functions for automatic slug and canonical URL generation
 */

/**
 * Generate a URL-friendly slug from text
 */
export const generateSlug = (text: string): string => {
  if (!text) return ''

  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove all non-word chars (except hyphens)
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Generate canonical URL based on collection and slug
 */
export const generateCanonicalUrl = (
  collection: string,
  slug: string,
  baseUrl?: string
): string => {
  if (!slug) return ''

  // Use environment variable or default
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  // Define collection URL paths
  const collectionPaths: Record<string, string> = {
    'services': '/services',
    'products': '/products',
    'projects': '/projects',
    'blog': '/blog',
    'team-members': '/team',
    'service-types': '/services/types',
  }

  const path = collectionPaths[collection] || `/${collection}`

  return `${base}${path}/${slug}`
}

/**
 * Ensure slug uniqueness by appending a number if needed
 */
export const ensureUniqueSlug = async (
  slug: string,
  collection: any,
  id?: string | number
): Promise<string> => {
  let uniqueSlug = slug
  let counter = 1

  while (true) {
    const query: any = { slug: { equals: uniqueSlug } }

    // Exclude current document if updating
    if (id) {
      query.id = { not_equals: id }
    }

    const existing = await collection.find({
      where: query,
      limit: 1,
    })

    if (existing.docs.length === 0) {
      break
    }

    uniqueSlug = `${slug}-${counter}`
    counter++
  }

  return uniqueSlug
}
