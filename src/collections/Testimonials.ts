import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company', 'rating', 'featured', 'status'],
  },
  access: {
    read: isPublic,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'company',
      type: 'text',
      required: false,
      admin: {
        description: 'Client company or organization',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: false,
      admin: {
        description: 'Client job title',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Testimonial text',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: false,
      min: 1,
      max: 5,
      admin: {
        description: 'Rating out of 5 stars',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Client photo or logo',
      },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: false,
      admin: {
        description: 'Related project (optional)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      admin: {
        description: 'Related service (optional)',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'YouTube or Vimeo video testimonial URL',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this testimonial on homepage',
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
    {
      name: 'dateReceived',
      type: 'date',
      required: false,
      admin: {
        description: 'Date testimonial was received',
      },
    },
  ],
}
