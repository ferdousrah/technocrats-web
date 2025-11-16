// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ServiceTypes } from './collections/ServiceTypes'
import { Services } from './collections/Services'
import { ProductCategories } from './collections/ProductCategories'
import { Products } from './collections/Products'
import { Projects } from './collections/Projects'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { BlogCategories } from './collections/BlogCategories'
import { BlogTags } from './collections/BlogTags'
import { Blog } from './collections/Blog'
import { ContactInquiries } from './collections/ContactInquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // Custom Views
      views: {
        dashboard: {
          Component: './components/admin/dashboard/CustomDashboard',
          path: '/',
          exact: true,
        },
        analytics: {
          Component: './components/admin/views/AnalyticsView',
          path: '/analytics',
          exact: true,
        },
      },
    },
    meta: {
      titleSuffix: '- Tech Company Admin',
    },
  },
  collections: [
    Users,
    Media,
    ServiceTypes,
    Services,
    ProductCategories,
    Products,
    Projects,
    TeamMembers,
    Testimonials,
    BlogCategories,
    BlogTags,
    Blog,
    ContactInquiries,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
