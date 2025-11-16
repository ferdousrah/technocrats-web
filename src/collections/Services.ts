import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI & ML Development', value: 'ai-ml' },
        { label: 'AI Agent Development', value: 'ai-agent' },
        { label: 'Business Automation', value: 'automation' },
        { label: 'Website Development', value: 'web-dev' },
        { label: 'E-commerce Development', value: 'ecommerce' },
        { label: 'Mobile App Development', value: 'mobile' },
        { label: 'Custom Software Development', value: 'custom-software' },
      ],
      admin: {
        description: 'Primary service category',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description (max 200 characters) for cards and previews',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed service description with formatting',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Service icon or image',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key features or benefits of this service',
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
        description: 'Technologies or tools used for this service',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'startingPrice',
          type: 'number',
          required: false,
          admin: {
            description: 'Starting price (optional)',
          },
        },
        {
          name: 'pricingModel',
          type: 'select',
          options: [
            { label: 'Fixed Price', value: 'fixed' },
            { label: 'Hourly Rate', value: 'hourly' },
            { label: 'Project-based', value: 'project' },
            { label: 'Custom Quote', value: 'custom' },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this service on the homepage',
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
      ],
    },
  ],
}
