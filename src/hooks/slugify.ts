import type { CollectionBeforeValidateHook, FieldHook } from 'payload'
import { generateSlug, generateCanonicalUrl } from '../utils/slugify'

/**
 * Hook to auto-generate slug from a source field
 * @param sourceField - The field to generate slug from (e.g., 'title', 'name')
 * @param collectionSlug - The collection slug for canonical URL generation
 */
export const formatSlug =
  (sourceField: string): FieldHook =>
  ({ operation, value, data }) => {
    // If slug is already set and we're updating, keep it
    if (operation === 'update' && value) {
      return value
    }

    // For create operation or if slug is empty
    if (data?.[sourceField]) {
      return generateSlug(data[sourceField])
    }

    return value
  }

/**
 * Hook to auto-generate canonical URL from slug
 * @param collectionSlug - The collection slug identifier
 */
export const formatCanonicalUrl =
  (collectionSlug: string): FieldHook =>
  ({ operation, value, data, siblingData }) => {
    // If canonical URL is explicitly set, keep it
    if (value) {
      return value
    }

    // Get slug from either data or siblingData
    const slug = data?.slug || siblingData?.slug

    if (slug) {
      return generateCanonicalUrl(collectionSlug, slug)
    }

    return value
  }

/**
 * Before validate hook to ensure slug is generated
 */
export const generateSlugBeforeValidate =
  (sourceField: string): CollectionBeforeValidateHook =>
  async ({ data, operation }) => {
    if (!data) return data

    // Only auto-generate on create if slug is not provided
    if (operation === 'create' && !data.slug && data[sourceField]) {
      data.slug = generateSlug(data[sourceField])
    }

    return data
  }
