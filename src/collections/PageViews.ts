import type { CollectionConfig } from 'payload'

export const PageViews: CollectionConfig = {
  slug: 'page-views',
  access: {
    read: () => true, // Allow frontend to write page views
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'page',
    defaultColumns: ['page', 'visitorId', 'country', 'createdAt'],
    group: 'Analytics',
  },
  fields: [
    {
      name: 'page',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'The page URL path visited',
      },
    },
    {
      name: 'visitorId',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Unique visitor identifier (hashed)',
      },
    },
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Session identifier',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      required: false,
      admin: {
        description: 'Page referrer URL',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: false,
      options: [
        { label: 'Direct', value: 'direct' },
        { label: 'Organic Search', value: 'organic' },
        { label: 'Social Media', value: 'social' },
        { label: 'Referral', value: 'referral' },
        { label: 'Email', value: 'email' },
        { label: 'Paid', value: 'paid' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Traffic source channel',
      },
    },
    {
      name: 'utm',
      type: 'group',
      fields: [
        {
          name: 'source',
          type: 'text',
        },
        {
          name: 'medium',
          type: 'text',
        },
        {
          name: 'campaign',
          type: 'text',
        },
        {
          name: 'term',
          type: 'text',
        },
        {
          name: 'content',
          type: 'text',
        },
      ],
    },
    {
      name: 'country',
      type: 'text',
      required: false,
      index: true,
      admin: {
        description: 'Visitor country code (ISO 3166-1 alpha-2)',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: false,
      admin: {
        description: 'Visitor city',
      },
    },
    {
      name: 'device',
      type: 'select',
      required: false,
      options: [
        { label: 'Desktop', value: 'desktop' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Tablet', value: 'tablet' },
      ],
    },
    {
      name: 'browser',
      type: 'text',
      required: false,
    },
    {
      name: 'os',
      type: 'text',
      required: false,
    },
    {
      name: 'screenWidth',
      type: 'number',
      required: false,
    },
    {
      name: 'screenHeight',
      type: 'number',
      required: false,
    },
    {
      name: 'duration',
      type: 'number',
      required: false,
      admin: {
        description: 'Time spent on page in seconds',
      },
    },
    {
      name: 'exitPage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Was this the exit page for the session?',
      },
    },
  ],
  timestamps: true,
}
