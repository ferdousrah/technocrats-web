import type { CollectionConfig } from 'payload'

export const DailyStats: CollectionConfig = {
  slug: 'daily-stats',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'date',
    defaultColumns: ['date', 'uniqueVisitors', 'totalPageViews', 'newVisitors', 'bounceRate'],
    group: 'Analytics',
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Date for these statistics (YYYY-MM-DD)',
      },
    },
    {
      name: 'uniqueVisitors',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Number of unique visitors',
      },
    },
    {
      name: 'totalPageViews',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Total page views',
      },
    },
    {
      name: 'newVisitors',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Number of new visitors',
      },
    },
    {
      name: 'returningVisitors',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Number of returning visitors',
      },
    },
    {
      name: 'totalSessions',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Total sessions',
      },
    },
    {
      name: 'bouncedSessions',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Number of bounced sessions',
      },
    },
    {
      name: 'bounceRate',
      type: 'number',
      required: false,
      admin: {
        description: 'Bounce rate percentage',
      },
    },
    {
      name: 'averageSessionDuration',
      type: 'number',
      required: false,
      admin: {
        description: 'Average session duration in seconds',
      },
    },
    {
      name: 'averagePageViewsPerSession',
      type: 'number',
      required: false,
      admin: {
        description: 'Average page views per session',
      },
    },
    {
      name: 'topPages',
      type: 'array',
      fields: [
        {
          name: 'page',
          type: 'text',
          required: true,
        },
        {
          name: 'views',
          type: 'number',
          required: true,
        },
      ],
      admin: {
        description: 'Top 10 pages by views',
      },
    },
    {
      name: 'trafficSources',
      type: 'array',
      fields: [
        {
          name: 'source',
          type: 'text',
          required: true,
        },
        {
          name: 'sessions',
          type: 'number',
          required: true,
        },
      ],
      admin: {
        description: 'Traffic by source channel',
      },
    },
    {
      name: 'countries',
      type: 'array',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'visitors',
          type: 'number',
          required: true,
        },
      ],
      admin: {
        description: 'Top countries by visitors',
      },
    },
  ],
  timestamps: true,
}
