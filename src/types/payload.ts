/**
 * TypeScript interfaces for PayloadCMS collections
 */

export interface Media {
  id: string
  alt?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  focalX?: number
  focalY?: number
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
      mimeType: string
      filesize: number
      filename: string
    }
    card?: {
      url: string
      width: number
      height: number
      mimeType: string
      filesize: number
      filename: string
    }
    tablet?: {
      url: string
      width: number
      height: number
      mimeType: string
      filesize: number
      filename: string
    }
  }
}

export interface SEO {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string | Media
  noIndex?: boolean
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon?: string
  serviceType?: {
    id: string
    name: string
    slug: string
  }
  content?: any // Lexical editor content
  featuredImage?: string | Media
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  content?: any
  featuredImage?: string | Media
  gallery?: Array<{
    image: string | Media
    caption?: string
  }>
  client?: string
  projectDate?: string
  technologies?: string[]
  projectUrl?: string
  githubUrl?: string
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: any
  featuredImage?: string | Media
  author?: {
    id: string
    name: string
    email: string
  }
  categories?: Array<{
    id: string
    name: string
    slug: string
  }>
  tags?: Array<{
    id: string
    name: string
    slug: string
  }>
  publishedDate?: string
  status: 'draft' | 'published'
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  photo?: string | Media
  email?: string
  phone?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  clientName: string
  clientRole?: string
  clientCompany?: string
  clientPhoto?: string | Media
  rating?: number
  testimonial: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'responded' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  content?: any
  price?: number
  featuredImage?: string | Media
  gallery?: Array<{
    image: string | Media
    caption?: string
  }>
  category?: {
    id: string
    name: string
    slug: string
  }
  features?: string[]
  specifications?: Array<{
    label: string
    value: string
  }>
  status: 'draft' | 'published'
  seo?: SEO
  createdAt: string
  updatedAt: string
}
