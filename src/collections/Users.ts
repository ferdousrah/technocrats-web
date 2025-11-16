import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: false,
      admin: {
        description: 'User first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
      admin: {
        description: 'User last name',
      },
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: ['user'],
      hasMany: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      admin: {
        description: 'User roles for access control',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'User profile picture',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
      admin: {
        description: 'User biography',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      admin: {
        description: 'Contact phone number',
      },
    },
  ],
}
