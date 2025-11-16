import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'
import { getSeoFields, jsonLdFields } from '../fields/seo'
import { formatSlug } from '../hooks/slugify'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'serviceType', 'featured', 'status'],
  },
  access: {
    read: isPublic,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      admin: {
        description: 'Auto-generated from title. You can customize it if needed.',
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      admin: {
        description: 'Client or company name',
      },
    },
    {
      name: 'serviceType',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      hasMany: true,
      admin: {
        description: 'Services provided for this project',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 250,
      admin: {
        description: 'Brief project summary (max 250 characters)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed project description, challenges, and solutions',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main project image',
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
        description: 'Additional project images',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Technologies, frameworks, and tools used',
      },
    },
    {
      name: 'results',
      type: 'group',
      fields: [
        {
          name: 'metrics',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Performance Improvement", "User Growth"',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "50%", "10,000+ users"',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'Project outcomes and metrics',
      },
    },
    {
      name: 'projectUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'Live project URL (if applicable)',
      },
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: false,
        },
        {
          name: 'completionDate',
          type: 'date',
          required: false,
        },
      ],
    },
    {
      name: 'teamSize',
      type: 'number',
      required: false,
      admin: {
        description: 'Number of team members involved',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this project on the homepage',
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
    ...getSeoFields('projects'),
    ...jsonLdFields,
  ],
}
