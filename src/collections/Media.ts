import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    components: {
      views: {
        list: {
          Component: './components/admin/collections/MediaList',
        },
      },
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    // File size restrictions
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
          },
        },
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      admin: {
        description: 'Image caption (optional)',
      },
    },
    {
      name: 'focalPoint',
      type: 'group',
      fields: [
        {
          name: 'x',
          type: 'number',
          required: false,
        },
        {
          name: 'y',
          type: 'number',
          required: false,
        },
      ],
      admin: {
        description: 'Focal point for cropping',
      },
    },
  ],
}
