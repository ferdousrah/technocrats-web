import type { CollectionConfig } from 'payload'
import { isEditor, isPublic } from '../access'
import { seoFields, jsonLdFields } from '../fields/seo'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'department', 'status'],
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
      label: 'Full Name',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or role',
      },
    },
    {
      name: 'department',
      type: 'select',
      required: false,
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'AI & ML', value: 'ai-ml' },
        { label: 'Development', value: 'development' },
        { label: 'Design', value: 'design' },
        { label: 'Project Management', value: 'pm' },
        { label: 'Sales & Marketing', value: 'sales' },
        { label: 'Support', value: 'support' },
      ],
    },
    {
      name: 'bio',
      type: 'richText',
      required: false,
      admin: {
        description: 'Professional biography',
      },
    },
    {
      name: 'shortBio',
      type: 'textarea',
      required: false,
      maxLength: 150,
      admin: {
        description: 'Brief bio for team cards (max 150 characters)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Professional headshot',
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: false,
        },
        {
          name: 'phone',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          required: false,
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          required: false,
          admin: {
            description: 'Twitter/X profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          required: false,
          admin: {
            description: 'GitHub profile URL',
          },
        },
        {
          name: 'website',
          type: 'text',
          required: false,
          admin: {
            description: 'Personal website URL',
          },
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key skills and expertise',
      },
    },
    {
      name: 'achievements',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'achievement',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Notable achievements or certifications',
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
    ...seoFields,
    ...jsonLdFields,
  ],
}
