import type { CollectionConfig } from 'payload'

export const Visitors: CollectionConfig = {
  slug: 'visitors',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'visitorId',
    defaultColumns: ['visitorId', 'sessionsCount', 'totalPageViews', 'lastVisit'],
    group: 'Analytics',
  },
  fields: [
    {
      name: 'visitorId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique visitor identifier (hashed)',
      },
    },
    {
      name: 'firstVisit',
      type: 'date',
      required: true,
      index: true,
      admin: {
        description: 'First visit timestamp',
      },
    },
    {
      name: 'lastVisit',
      type: 'date',
      required: true,
      index: true,
      admin: {
        description: 'Last visit timestamp',
      },
    },
    {
      name: 'sessionsCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Total number of sessions',
      },
    },
    {
      name: 'totalPageViews',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Total page views across all sessions',
      },
    },
    {
      name: 'totalDuration',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        description: 'Total time spent on site in seconds',
      },
    },
    {
      name: 'averageDuration',
      type: 'number',
      required: false,
      admin: {
        description: 'Average session duration in seconds',
      },
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
  ],
  timestamps: true,
}
