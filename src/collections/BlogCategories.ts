import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'
import { formatSlug } from '../hooks/slugify'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'status'],
    components: {
      views: {
        list: {
          Component: './components/admin/collections/TaxonomyList#BlogCategoriesList',
        },
      },
    },
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
      label: 'Category Name',
      admin: {
        description: 'e.g., AI & Machine Learning, Web Development, Case Studies, etc.',
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
        description: 'Brief description of this blog category',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      admin: {
        description: 'Hex color code for UI theming (e.g., #2196F3)',
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
