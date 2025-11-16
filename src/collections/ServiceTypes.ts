import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'

export const ServiceTypes: CollectionConfig = {
  slug: 'service-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'status'],
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
      label: 'Service Type Name',
      admin: {
        description: 'e.g., AI & ML Development, Web Development, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., ai-ml, web-dev)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Brief description of this service type',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Icon or image representing this service type',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      admin: {
        description: 'Hex color code for UI theming (e.g., #FF6B6B)',
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
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ],
}
