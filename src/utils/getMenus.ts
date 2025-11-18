import { unstable_cache } from 'next/cache'

export interface MenuItem {
  label: string
  href?: string
  title?: string
  icon?: string
  openInNewTab?: boolean
  cssClass?: string
  description?: string
  submenu?: Array<{
    label: string
    href: string
    icon?: string
    openInNewTab?: boolean
    cssClass?: string
  }>
}

interface PayloadMenuItem {
  label: string
  type: 'custom' | 'blog' | 'service' | 'product' | 'project' | 'blog-category' | 'product-category'
  customUrl?: string
  blogPost?: any
  service?: any
  product?: any
  project?: any
  blogCategory?: any
  productCategory?: any
  icon?: string
  openInNewTab?: boolean
  cssClass?: string
  description?: string
  children?: PayloadMenuItem[]
}

interface PayloadMenu {
  id: string
  name: string
  location: string
  items: PayloadMenuItem[]
  active: boolean
}

// Transform a single menu item from Payload format to component format
function transformMenuItem(item: PayloadMenuItem): MenuItem {
  let href = ''

  // Determine the href based on type
  switch (item.type) {
    case 'custom':
      href = item.customUrl || '/'
      break
    case 'blog':
      href = item.blogPost?.slug ? `/blog/${item.blogPost.slug}` : '/blog'
      break
    case 'service':
      href = item.service?.slug ? `/services/${item.service.slug}` : '/services'
      break
    case 'product':
      href = item.product?.slug ? `/products/${item.product.slug}` : '/products'
      break
    case 'project':
      href = item.project?.slug ? `/projects/${item.project.slug}` : '/projects'
      break
    case 'blog-category':
      href = item.blogCategory?.slug ? `/blog/category/${item.blogCategory.slug}` : '/blog'
      break
    case 'product-category':
      href = item.productCategory?.slug ? `/products/category/${item.productCategory.slug}` : '/products'
      break
  }

  // Build the menu item
  const menuItem: MenuItem = {
    label: item.label,
    title: item.label, // For components that use "title"
    href,
    icon: item.icon,
    openInNewTab: item.openInNewTab,
    cssClass: item.cssClass,
    description: item.description,
  }

  // Add submenu if children exist
  if (item.children && item.children.length > 0) {
    menuItem.submenu = item.children.map((child) => {
      let childHref = ''
      switch (child.type) {
        case 'custom':
          childHref = child.customUrl || '/'
          break
        case 'blog':
          childHref = child.blogPost?.slug ? `/blog/${child.blogPost.slug}` : '/blog'
          break
        case 'service':
          childHref = child.service?.slug ? `/services/${child.service.slug}` : '/services'
          break
        case 'product':
          childHref = child.product?.slug ? `/products/${child.product.slug}` : '/products'
          break
        case 'project':
          childHref = child.project?.slug ? `/projects/${child.project.slug}` : '/projects'
          break
        case 'blog-category':
          childHref = child.blogCategory?.slug ? `/blog/category/${child.blogCategory.slug}` : '/blog'
          break
        case 'product-category':
          childHref = child.productCategory?.slug ? `/products/category/${child.productCategory.slug}` : '/products'
          break
      }

      return {
        label: child.label,
        href: childHref,
        icon: child.icon,
        openInNewTab: child.openInNewTab,
        cssClass: child.cssClass,
      }
    })

    // Don't include href for parent if it has submenu
    delete menuItem.href
  }

  return menuItem
}

// Fetch menu by location with caching
async function fetchMenuByLocation(location: string): Promise<MenuItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/menus?where[location][equals]=${location}&where[active][equals]=true&limit=1`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch menu: ${response.statusText}`)
      return []
    }

    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      return []
    }

    const menu: PayloadMenu = data.docs[0]

    // Transform all menu items
    return menu.items.map(transformMenuItem)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return []
  }
}

// Cached version for better performance
export const getMenuByLocation = unstable_cache(
  async (location: string) => fetchMenuByLocation(location),
  ['menu-by-location'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['menus'],
  }
)

// Convenience functions for common menu locations
export const getHeaderMenu = () => getMenuByLocation('header-primary')
export const getMobileMenu = () => getMenuByLocation('mobile')
export const getFooterMenu = () => getMenuByLocation('footer-main')
