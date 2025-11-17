import type { CollectionConfig } from 'payload'
import { isAuthorOrAdmin, isPublic } from '../access'
import { getSeoFields, jsonLdFields } from '../fields/seo'
import { formatSlug } from '../hooks/slugify'
import {
  BlocksFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  HeadingFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  InlineCodeFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedDate'],
    components: {
      views: {
        list: {
          Component: './components/admin/collections/BlogList',
        },
      },
    },
  },
  access: {
    read: isPublic,
    create: isAuthorOrAdmin('author'),
    update: isAuthorOrAdmin('author'),
    delete: isAuthorOrAdmin('author'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Article author',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Brief article summary (max 300 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          InlineCodeFeature(),
          LinkFeature({
            enabledCollections: ['blog', 'services', 'products', 'projects'],
            fields: [
              {
                name: 'rel',
                type: 'select',
                label: 'Rel Attribute',
                hasMany: true,
                options: [
                  { label: 'noopener', value: 'noopener' },
                  { label: 'noreferrer', value: 'noreferrer' },
                  { label: 'nofollow', value: 'nofollow' },
                ],
              },
            ],
          }),
          OrderedListFeature(),
          UnorderedListFeature(),
          BlocksFeature({
            blocks: [
              {
                slug: 'code',
                fields: [
                  {
                    name: 'language',
                    type: 'select',
                    required: true,
                    defaultValue: 'javascript',
                    options: [
                      { label: 'JavaScript', value: 'javascript' },
                      { label: 'TypeScript', value: 'typescript' },
                      { label: 'Python', value: 'python' },
                      { label: 'Java', value: 'java' },
                      { label: 'C#', value: 'csharp' },
                      { label: 'C++', value: 'cpp' },
                      { label: 'Go', value: 'go' },
                      { label: 'Rust', value: 'rust' },
                      { label: 'PHP', value: 'php' },
                      { label: 'Ruby', value: 'ruby' },
                      { label: 'HTML', value: 'html' },
                      { label: 'CSS', value: 'css' },
                      { label: 'SQL', value: 'sql' },
                      { label: 'Bash', value: 'bash' },
                      { label: 'JSON', value: 'json' },
                      { label: 'YAML', value: 'yaml' },
                      { label: 'Markdown', value: 'markdown' },
                    ],
                  },
                  {
                    name: 'code',
                    type: 'code',
                    required: true,
                    admin: {
                      language: 'javascript',
                    },
                  },
                ],
              },
              {
                slug: 'image',
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
                  },
                  {
                    name: 'alignment',
                    type: 'select',
                    defaultValue: 'center',
                    options: [
                      { label: 'Left', value: 'left' },
                      { label: 'Center', value: 'center' },
                      { label: 'Right', value: 'right' },
                      { label: 'Full Width', value: 'full' },
                    ],
                  },
                ],
              },
              {
                slug: 'callout',
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    required: true,
                    defaultValue: 'info',
                    options: [
                      { label: 'Info', value: 'info' },
                      { label: 'Warning', value: 'warning' },
                      { label: 'Success', value: 'success' },
                      { label: 'Error', value: 'error' },
                    ],
                  },
                  {
                    name: 'content',
                    type: 'richText',
                    required: true,
                  },
                ],
              },
            ],
          }),
        ],
      }),
      admin: {
        description: 'Full article content with enhanced formatting options',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Main article image',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
      required: true,
      admin: {
        description: 'Article category',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'blog-tags',
      hasMany: true,
      required: false,
      admin: {
        description: 'Article tags for better searchability',
      },
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      hasMany: true,
      admin: {
        description: 'Related services mentioned in the article',
      },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      required: false,
      hasMany: true,
      admin: {
        description: 'Related projects mentioned in the article',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: false,
      admin: {
        description: 'Estimated read time in minutes',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this article on homepage',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: false,
      admin: {
        description: 'Article publication date',
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
    ...getSeoFields('blog'),
    ...jsonLdFields,
  ],
}
