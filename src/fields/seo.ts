import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO & Meta Data',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        required: false,
        maxLength: 60,
        admin: {
          description: 'Recommended: 50-60 characters. Leave empty to use the page title.',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        required: false,
        maxLength: 160,
        admin: {
          description: 'Recommended: 150-160 characters. This appears in search results.',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        required: false,
        admin: {
          description: 'Comma-separated keywords (e.g., web development, ai, machine learning)',
        },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        required: false,
        admin: {
          description: 'Open Graph image for social media sharing (recommended: 1200x630px)',
        },
      },
      {
        name: 'ogTitle',
        type: 'text',
        required: false,
        maxLength: 60,
        admin: {
          description: 'Open Graph title (defaults to metaTitle if empty)',
        },
      },
      {
        name: 'ogDescription',
        type: 'textarea',
        required: false,
        maxLength: 160,
        admin: {
          description: 'Open Graph description (defaults to metaDescription if empty)',
        },
      },
      {
        name: 'canonicalUrl',
        type: 'text',
        required: false,
        admin: {
          description: 'Canonical URL for duplicate content management',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from indexing this page',
        },
      },
      {
        name: 'noFollow',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from following links on this page',
        },
      },
    ],
  },
]

export const jsonLdFields: Field[] = [
  {
    name: 'jsonLd',
    type: 'group',
    label: 'Structured Data (JSON-LD)',
    admin: {
      description: 'Structured data for rich snippets in search results',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Enable structured data for this page',
        },
      },
      {
        name: 'schemaType',
        type: 'select',
        required: false,
        options: [
          { label: 'Article', value: 'Article' },
          { label: 'BlogPosting', value: 'BlogPosting' },
          { label: 'Product', value: 'Product' },
          { label: 'Service', value: 'Service' },
          { label: 'Organization', value: 'Organization' },
          { label: 'Person', value: 'Person' },
          { label: 'WebPage', value: 'WebPage' },
          { label: 'SoftwareApplication', value: 'SoftwareApplication' },
          { label: 'Review', value: 'Review' },
          { label: 'FAQ', value: 'FAQPage' },
        ],
        admin: {
          description: 'Schema.org type for structured data',
        },
      },
      {
        name: 'customSchema',
        type: 'textarea',
        required: false,
        admin: {
          description: 'Custom JSON-LD schema (advanced users only). Leave empty for auto-generation.',
        },
      },
    ],
  },
]
