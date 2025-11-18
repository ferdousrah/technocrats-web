import type { CollectionConfig } from 'payload'

export const Sessions: CollectionConfig = {
  slug: 'sessions',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'sessionId',
    defaultColumns: ['sessionId', 'visitorId', 'isNew', 'country', 'startedAt'],
    group: 'Analytics',
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique session identifier',
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
      name: 'isNew',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Is this a new visitor?',
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
      index: true,
      admin: {
        description: 'Session start time',
      },
    },
    {
      name: 'endedAt',
      type: 'date',
      required: false,
      admin: {
        description: 'Session end time',
      },
    },
    {
      name: 'duration',
      type: 'number',
      required: false,
      admin: {
        description: 'Total session duration in seconds',
      },
    },
    {
      name: 'pageViews',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        description: 'Number of pages viewed in session',
      },
    },
    {
      name: 'bounced',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Did visitor bounce? (left after viewing only 1 page)',
      },
    },
    {
      name: 'landingPage',
      type: 'text',
      required: false,
      admin: {
        description: 'First page visited in session',
      },
    },
    {
      name: 'exitPage',
      type: 'text',
      required: false,
      admin: {
        description: 'Last page visited in session',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      required: false,
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
    },
    {
      name: 'country',
      type: 'text',
      required: false,
      index: true,
    },
    {
      name: 'city',
      type: 'text',
      required: false,
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: {
        description: 'Is this session currently active? (last activity < 30 min)',
      },
    },
    {
      name: 'lastActivityAt',
      type: 'date',
      required: false,
      admin: {
        description: 'Last activity timestamp',
      },
    },
  ],
  timestamps: true,
}
