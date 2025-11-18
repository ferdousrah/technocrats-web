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

// Default fallback menus
const DEFAULT_HEADER_MENU: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

const DEFAULT_MOBILE_MENU: MenuItem[] = [
  {
    title: 'Home',
    submenu: [
      { label: 'Main home', href: '/home-main' },
      { label: 'Software development company', href: '/home-software-development-company' },
      { label: 'Freelancer portfolio', href: '/home-freelancer-portfolio' },
      { label: 'Digital agency', href: '/home-digital-agency' },
      { label: 'Creative design studio', href: '/home-creative-design-studio' },
      { label: 'Personal portfolio', href: '/home-personal-portfolio' },
      { label: 'Web agency', href: '/home-web-agency' },
      { label: 'Creative developer', href: '/home-creative-developer' },
      { label: 'Designer', href: '/home-designer' }
    ]
  },
  {
    title: 'Works',
    submenu: [
      { label: 'Portfolio', href: '/works-simple' },
      { label: 'Works masonry', href: '/works-masonry' },
      { label: 'Project details', href: '/project-details' }
    ]
  },
  {
    title: 'Pages',
    submenu: [
      { label: 'About me', href: '/about-me' },
      { label: 'About us', href: '/about-us' },
      { label: 'Services', href: '/services' },
      { label: 'Our team', href: '/team' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ page', href: '/faq' },
      { label: '404 error page', href: '/404' },
      { label: 'Landing page', href: '/home-2' }
    ]
  },
  {
    title: 'Insights',
    submenu: [
      { label: 'Blog standard', href: '/blog-standard' },
      { label: 'Blog creative', href: '/blog-creative' },
      { label: 'Single post', href: '/blog-article' }
    ]
  },
  {
    title: 'Contact',
    href: '/contact'
  }
]

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
async function fetchMenuByLocation(location: string, fallback: MenuItem[]): Promise<MenuItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/menus?where[location][equals]=${location}&where[active][equals]=true&limit=1`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.warn(`Failed to fetch menu for location "${location}": ${response.statusText}. Using fallback menu.`)
      return fallback
    }

    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      console.warn(`No active menu found for location "${location}". Using fallback menu.`)
      return fallback
    }

    const menu: PayloadMenu = data.docs[0]

    if (!menu.items || menu.items.length === 0) {
      console.warn(`Menu found for location "${location}" but has no items. Using fallback menu.`)
      return fallback
    }

    // Transform all menu items
    return menu.items.map(transformMenuItem)
  } catch (error) {
    console.error(`Error fetching menu for location "${location}":`, error)
    console.warn('Using fallback menu.')
    return fallback
  }
}

// Convenience functions for common menu locations
export const getHeaderMenu = () => fetchMenuByLocation('header-primary', DEFAULT_HEADER_MENU)
export const getMobileMenu = () => fetchMenuByLocation('mobile', DEFAULT_MOBILE_MENU)
export const getFooterMenu = () => fetchMenuByLocation('footer-main', [])
