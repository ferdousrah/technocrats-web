import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'
import { getSeoFields, jsonLdFields } from '../fields/seo'
import { formatSlug } from '../hooks/slugify'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'version', 'featured', 'status'],
  },
  access: {
    read: isPublic,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
      admin: {
        description: 'e.g., HRM System, Accounting Software, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
      admin: {
        description: 'Auto-generated from product name. You can customize it if needed.',
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Human Resource Management (HRM)', value: 'hrm' },
        { label: 'Accounting & Finance', value: 'accounting' },
        { label: 'Customer Relationship Management (CRM)', value: 'crm' },
        { label: 'Enterprise Resource Planning (ERP)', value: 'erp' },
        { label: 'Project Management', value: 'project-management' },
        { label: 'Inventory Management', value: 'inventory' },
        { label: 'Point of Sale (POS)', value: 'pos' },
        { label: 'E-commerce Platform', value: 'ecommerce-platform' },
        { label: 'Learning Management System (LMS)', value: 'lms' },
        { label: 'Business Intelligence', value: 'business-intelligence' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Product category',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: false,
      admin: {
        description: 'Short catchy tagline (e.g., "Simplify Your HR Operations")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description for cards and previews (max 200 characters)',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed product description with formatting',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Product logo',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main product image or screenshot',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
        },
      ],
      admin: {
        description: 'Product screenshots and images',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
      admin: {
        description: 'Key features and capabilities',
      },
    },
    {
      name: 'modules',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Module name (e.g., Payroll, Attendance, Leave Management)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'included',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Included in base package',
          },
        },
      ],
      admin: {
        description: 'Product modules or components',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Technologies used to build this product',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'plans',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Plan name (e.g., Basic, Professional, Enterprise)',
              },
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                description: 'Price amount',
              },
            },
            {
              name: 'currency',
              type: 'text',
              defaultValue: 'USD',
              admin: {
                description: 'Currency code (e.g., USD, EUR, BDT)',
              },
            },
            {
              name: 'billingPeriod',
              type: 'select',
              options: [
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
                { label: 'One-time', value: 'one-time' },
                { label: 'Custom', value: 'custom' },
              ],
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'popular',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Mark as most popular plan',
              },
            },
          ],
        },
        {
          name: 'customPricingAvailable',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Offer custom pricing for enterprises',
          },
        },
        {
          name: 'freeTrial',
          type: 'group',
          fields: [
            {
              name: 'available',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'duration',
              type: 'number',
              admin: {
                description: 'Trial duration in days',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key benefits for customers',
      },
    },
    {
      name: 'targetAudience',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'audience',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., Small Businesses, Enterprises, Startups',
          },
        },
      ],
    },
    {
      name: 'integrations',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
      admin: {
        description: 'Third-party integrations supported',
      },
    },
    {
      name: 'demo',
      type: 'group',
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Demo available',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Demo URL',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          admin: {
            description: 'Demo video URL (YouTube, Vimeo, etc.)',
          },
        },
      ],
    },
    {
      name: 'documentation',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Documentation URL',
          },
        },
        {
          name: 'userGuide',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'User guide PDF',
          },
        },
      ],
    },
    {
      name: 'support',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'hours',
          type: 'text',
          admin: {
            description: 'Support hours (e.g., 24/7, 9 AM - 5 PM)',
          },
        },
      ],
    },
    {
      name: 'version',
      type: 'text',
      required: false,
      admin: {
        description: 'Current product version',
      },
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: false,
      admin: {
        description: 'Product release or launch date',
      },
    },
    {
      name: 'lastUpdate',
      type: 'date',
      required: false,
      admin: {
        description: 'Last update date',
      },
    },
    {
      name: 'changelog',
      type: 'richText',
      required: false,
      admin: {
        description: 'Version history and changes',
      },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      required: false,
      admin: {
        description: 'Projects using this product',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this product on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
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
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Retired', value: 'retired' },
      ],
    },
    ...getSeoFields('products'),
    ...jsonLdFields,
  ],
}
