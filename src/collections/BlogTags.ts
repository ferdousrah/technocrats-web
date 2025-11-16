import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'
import { formatSlug } from '../hooks/slugify'

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
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
      label: 'Tag Name',
      admin: {
        description: 'e.g., JavaScript, TypeScript, AI, Machine Learning, etc.',
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
        description: 'Auto-generated from name. You can customize it if needed.',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Brief description of this tag',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      admin: {
        description: 'Hex color code for UI theming (e.g., #10B981)',
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
