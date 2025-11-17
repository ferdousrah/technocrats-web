export interface MenuItem {
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
  children?: MenuItem[]
  id?: string
}

export interface Menu {
  id: string
  name: string
  location: string
  items: MenuItem[]
  active: boolean
}

export type MenuLocation =
  | 'header-primary'
  | 'header-secondary'
  | 'footer-main'
  | 'footer-secondary'
  | 'mobile'
  | 'sidebar'
