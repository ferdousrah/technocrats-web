import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'itemsCount', 'updatedAt'],
    components: {
      views: {
        list: {
          Component: './components/admin/collections/MenusList',
        },
      },
    },
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access for frontend
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Menu Name',
      admin: {
        description: 'A unique name for this menu (e.g., "Header Menu", "Footer Menu")',
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      label: 'Menu Location',
      options: [
        { label: 'Header - Primary', value: 'header-primary' },
        { label: 'Header - Secondary', value: 'header-secondary' },
        { label: 'Footer - Main', value: 'footer-main' },
        { label: 'Footer - Secondary', value: 'footer-secondary' },
        { label: 'Mobile Menu', value: 'mobile' },
        { label: 'Sidebar', value: 'sidebar' },
      ],
      admin: {
        description: 'Where this menu should appear on your website',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      admin: {
        description: 'Add and organize your menu items. Drag to reorder.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menu Label',
          admin: {
            description: 'Text to display for this menu item',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'custom',
          label: 'Link Type',
          options: [
            { label: 'Custom URL', value: 'custom' },
            { label: 'Blog Post', value: 'blog' },
            { label: 'Service', value: 'service' },
            { label: 'Product', value: 'product' },
            { label: 'Project', value: 'project' },
            { label: 'Blog Category', value: 'blog-category' },
            { label: 'Product Category', value: 'product-category' },
          ],
          admin: {
            description: 'Choose the type of link for this menu item',
          },
        },
        {
          name: 'customUrl',
          type: 'text',
          label: 'Custom URL',
          admin: {
            description: 'Enter a custom URL (e.g., /about, https://example.com)',
            condition: (data, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'blogPost',
          type: 'relationship',
          relationTo: 'blog',
          label: 'Select Blog Post',
          admin: {
            description: 'Choose a blog post to link to',
            condition: (data, siblingData) => siblingData?.type === 'blog',
          },
        },
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          label: 'Select Service',
          admin: {
            description: 'Choose a service to link to',
            condition: (data, siblingData) => siblingData?.type === 'service',
          },
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          label: 'Select Product',
          admin: {
            description: 'Choose a product to link to',
            condition: (data, siblingData) => siblingData?.type === 'product',
          },
        },
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          label: 'Select Project',
          admin: {
            description: 'Choose a project to link to',
            condition: (data, siblingData) => siblingData?.type === 'project',
          },
        },
        {
          name: 'blogCategory',
          type: 'relationship',
          relationTo: 'blog-categories',
          label: 'Select Blog Category',
          admin: {
            description: 'Choose a blog category to link to',
            condition: (data, siblingData) => siblingData?.type === 'blog-category',
          },
        },
        {
          name: 'productCategory',
          type: 'relationship',
          relationTo: 'product-categories',
          label: 'Select Product Category',
          admin: {
            description: 'Choose a product category to link to',
            condition: (data, siblingData) => siblingData?.type === 'product-category',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Class',
          admin: {
            description: 'Optional icon class (e.g., "fas fa-home" for Font Awesome)',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
          admin: {
            description: 'Open this link in a new browser tab',
          },
        },
        {
          name: 'cssClass',
          type: 'text',
          label: 'CSS Class',
          admin: {
            description: 'Optional CSS class for custom styling',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          maxLength: 200,
          admin: {
            description: 'Optional description for mega menus or tooltips',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Sub Menu Items',
          admin: {
            description: 'Add nested submenu items',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Submenu Label',
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'custom',
              label: 'Link Type',
              options: [
                { label: 'Custom URL', value: 'custom' },
                { label: 'Blog Post', value: 'blog' },
                { label: 'Service', value: 'service' },
                { label: 'Product', value: 'product' },
                { label: 'Project', value: 'project' },
                { label: 'Blog Category', value: 'blog-category' },
                { label: 'Product Category', value: 'product-category' },
              ],
            },
            {
              name: 'customUrl',
              type: 'text',
              label: 'Custom URL',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'custom',
              },
            },
            {
              name: 'blogPost',
              type: 'relationship',
              relationTo: 'blog',
              label: 'Select Blog Post',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'blog',
              },
            },
            {
              name: 'service',
              type: 'relationship',
              relationTo: 'services',
              label: 'Select Service',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'service',
              },
            },
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              label: 'Select Product',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'product',
              },
            },
            {
              name: 'project',
              type: 'relationship',
              relationTo: 'projects',
              label: 'Select Project',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'project',
              },
            },
            {
              name: 'blogCategory',
              type: 'relationship',
              relationTo: 'blog-categories',
              label: 'Select Blog Category',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'blog-category',
              },
            },
            {
              name: 'productCategory',
              type: 'relationship',
              relationTo: 'product-categories',
              label: 'Select Product Category',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'product-category',
              },
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Class',
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Open in New Tab',
              defaultValue: false,
            },
            {
              name: 'cssClass',
              type: 'text',
              label: 'CSS Class',
            },
          ],
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Toggle to enable/disable this menu',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate items count for display
        if (data.items) {
          data.itemsCount = data.items.length
        }
        return data
      },
    ],
  },
}
