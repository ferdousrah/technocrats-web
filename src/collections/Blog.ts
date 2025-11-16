import type { CollectionConfig } from 'payload'
import { isAuthorOrAdmin, isPublic } from '../access'
import { seoFields, jsonLdFields } from '../fields/seo'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedDate'],
  },
  access: {
    read: isPublic,
    create: isAuthorOrAdmin('author'),
    update: isAuthorOrAdmin('author'),
    delete: isAuthorOrAdmin('author'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Article author',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Brief article summary (max 300 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full article content',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main article image',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI & Machine Learning', value: 'ai-ml' },
        { label: 'Web Development', value: 'web-dev' },
        { label: 'Mobile Development', value: 'mobile' },
        { label: 'Business Automation', value: 'automation' },
        { label: 'Case Studies', value: 'case-studies' },
        { label: 'Industry Insights', value: 'insights' },
        { label: 'Technology Trends', value: 'trends' },
        { label: 'Tutorials', value: 'tutorials' },
        { label: 'Company News', value: 'news' },
      ],
      admin: {
        description: 'Article category',
      },
    },
    {
      name: 'tags',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Article tags for better searchability',
      },
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      hasMany: true,
      admin: {
        description: 'Related services mentioned in the article',
      },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      required: false,
      hasMany: true,
      admin: {
        description: 'Related projects mentioned in the article',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: false,
      admin: {
        description: 'Estimated read time in minutes',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this article on homepage',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: false,
      admin: {
        description: 'Article publication date',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    ...seoFields,
    ...jsonLdFields,
  ],
}
