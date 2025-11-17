/**
 * PayloadCMS API Utility Functions
 * Handles fetching data from PayloadCMS REST API
 */

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export interface PaginatedDocs<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * Fetch all documents from a collection
 */
export async function fetchDocs<T>(
  collection: string,
  params?: {
    limit?: number
    page?: number
    sort?: string
    where?: any
    depth?: number
  }
): Promise<PaginatedDocs<T>> {
  const queryParams = new URLSearchParams()

  if (params?.limit) queryParams.append('limit', params.limit.toString())
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.sort) queryParams.append('sort', params.sort)
  if (params?.depth) queryParams.append('depth', params.depth.toString())
  if (params?.where) queryParams.append('where', JSON.stringify(params.where))

  const url = `${API_URL}/api/${collection}?${queryParams.toString()}`

  const res = await fetch(url, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${collection}: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Fetch a single document by slug
 */
export async function fetchDocBySlug<T>(
  collection: string,
  slug: string,
  depth: number = 1
): Promise<T | null> {
  const data = await fetchDocs<T>(collection, {
    limit: 1,
    where: {
      slug: { equals: slug },
    },
    depth,
  })

  return data.docs[0] || null
}

/**
 * Fetch a single document by ID
 */
export async function fetchDocById<T>(
  collection: string,
  id: string,
  depth: number = 1
): Promise<T | null> {
  const url = `${API_URL}/api/${collection}/${id}?depth=${depth}`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

/**
 * Submit contact form to PayloadCMS
 */
export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}) {
  const url = `${API_URL}/api/contact-inquiries`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to submit form')
  }

  return res.json()
}

/**
 * Get popular/featured blog posts
 */
export async function getFeaturedBlogPosts<T>(limit: number = 3): Promise<T[]> {
  const data = await fetchDocs<T>('blog', {
    limit,
    sort: '-publishedDate',
    where: {
      status: { equals: 'published' },
    },
    depth: 2,
  })

  return data.docs
}

/**
 * Get latest projects
 */
export async function getLatestProjects<T>(limit: number = 6): Promise<T[]> {
  const data = await fetchDocs<T>('projects', {
    limit,
    sort: '-createdAt',
    depth: 2,
  })

  return data.docs
}

/**
 * Get all services
 */
export async function getAllServices<T>(): Promise<T[]> {
  const data = await fetchDocs<T>('services', {
    limit: 100,
    sort: 'title',
    depth: 1,
  })

  return data.docs
}

/**
 * Get all testimonials
 */
export async function getAllTestimonials<T>(): Promise<T[]> {
  const data = await fetchDocs<T>('testimonials', {
    limit: 100,
    sort: '-createdAt',
    depth: 1,
  })

  return data.docs
}

/**
 * Get team members
 */
export async function getTeamMembers<T>(): Promise<T[]> {
  const data = await fetchDocs<T>('team-members', {
    limit: 100,
    sort: 'name',
    depth: 1,
  })

  return data.docs
}
