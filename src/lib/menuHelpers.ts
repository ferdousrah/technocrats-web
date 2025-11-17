import { MenuItem } from '../types/menu'

/**
 * Generate URL from menu item based on its type
 */
export function getMenuItemUrl(item: MenuItem): string {
  switch (item.type) {
    case 'custom':
      return item.customUrl || '#'
    
    case 'blog':
      if (item.blogPost) {
        const slug = typeof item.blogPost === 'object' ? item.blogPost.slug : item.blogPost
        return `/blog/${slug}`
      }
      return '#'
    
    case 'service':
      if (item.service) {
        const slug = typeof item.service === 'object' ? item.service.slug : item.service
        return `/services/${slug}`
      }
      return '#'
    
    case 'product':
      if (item.product) {
        const slug = typeof item.product === 'object' ? item.product.slug : item.product
        return `/products/${slug}`
      }
      return '#'
    
    case 'project':
      if (item.project) {
        const slug = typeof item.project === 'object' ? item.project.slug : item.project
        return `/projects/${slug}`
      }
      return '#'
    
    case 'blog-category':
      if (item.blogCategory) {
        const slug = typeof item.blogCategory === 'object' ? item.blogCategory.slug : item.blogCategory
        return `/blog/category/${slug}`
      }
      return '#'
    
    case 'product-category':
      if (item.productCategory) {
        const slug = typeof item.productCategory === 'object' ? item.productCategory.slug : item.productCategory
        return `/products/category/${slug}`
      }
      return '#'
    
    default:
      return '#'
  }
}

/**
 * Fetch menu by location
 */
export async function getMenuByLocation(location: string): Promise<any | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(
      `${baseUrl}/api/menus?where[location][equals]=${location}&where[active][equals]=true&depth=2`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      console.error(`Failed to fetch menu for location: ${location}`)
      return null
    }

    const data = await response.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('Error fetching menu:', error)
    return null
  }
}

/**
 * Check if menu item has children
 */
export function hasChildren(item: MenuItem): boolean {
  return !!(item.children && item.children.length > 0)
}

/**
 * Get link target attribute
 */
export function getLinkTarget(item: MenuItem): string {
  return item.openInNewTab ? '_blank' : '_self'
}

/**
 * Get link rel attribute
 */
export function getLinkRel(item: MenuItem): string | undefined {
  return item.openInNewTab ? 'noopener noreferrer' : undefined
}
