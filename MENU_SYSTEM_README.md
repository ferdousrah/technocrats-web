# WordPress-Style Menu Management System

This project includes a comprehensive menu management system similar to WordPress, allowing you to create and manage navigation menus for your frontend.

## Features

 **Multiple Menu Locations**: Header, Footer, Mobile, Sidebar
 **Link Types**: Custom URLs, Blog Posts, Services, Products, Projects, Categories
 **Nested Menus**: Support for parent-child menu structures (submenus)
 **Drag & Drop**: Reorder menu items easily in the admin panel
 **Icon Support**: Add icons to menu items
 **Custom CSS Classes**: Style individual menu items
 **Open in New Tab**: Control link behavior
 **Menu Descriptions**: Add tooltips or mega menu descriptions
 **Active/Inactive**: Toggle menus on/off

## Admin Panel Usage

### 1. Access Menu Management

Navigate to: **Admin Panel ’ Content ’ Menus**

### 2. Create a New Menu

1. Click **"Create New"** button
2. Fill in menu details:
   - **Menu Name**: e.g., "Header Menu", "Footer Menu"
   - **Menu Location**: Choose where this menu appears
   - **Active**: Toggle to enable/disable

### 3. Add Menu Items

For each menu item, you can configure:

- **Menu Label**: Display text
- **Link Type**: Choose from:
  - Custom URL
  - Blog Post
  - Service
  - Product
  - Project
  - Blog Category
  - Product Category
- **Icon**: Optional icon class (e.g., Font Awesome)
- **Open in New Tab**: Check to open links in new window
- **CSS Class**: Custom styling class
- **Description**: For tooltips or mega menus

### 4. Create Nested Menus

- Click "Add Sub Menu Items" under any menu item
- Add child items that will appear as dropdowns

### 5. Reorder Items

- Use the drag handle or array controls to reorder items
- Higher items appear first in the menu

## Frontend Integration

### Option 1: Use MenuFetcher Component (Recommended)

The easiest way to display a menu is using the `MenuFetcher` server component:

```tsx
import MenuFetcher from '@/components/MenuFetcher'

export default function Header() {
  return (
    <nav>
      <MenuFetcher
        location="header-primary"
        className="main-navigation"
        itemClassName="nav-item"
        subMenuClassName="dropdown-menu"
      />
    </nav>
  )
}
```

### Option 2: Manual Data Fetching

For more control, fetch menu data yourself:

```tsx
import { getMenuByLocation } from '@/lib/menuHelpers'
import Menu from '@/components/Menu'

export default async function Header() {
  const menu = await getMenuByLocation('header-primary')

  if (!menu) return null

  return (
    <nav>
      <Menu
        items={menu.items}
        className="main-nav"
      />
    </nav>
  )
}
```

## Available Menu Locations

- `header-primary`: Main header navigation
- `header-secondary`: Secondary header navigation
- `footer-main`: Primary footer navigation
- `footer-secondary`: Secondary footer links
- `mobile`: Mobile navigation menu
- `sidebar`: Sidebar navigation

## Styling Your Menus

The menu system uses semantic class names for easy styling:

```css
/* Basic menu styling */
.menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
}

.menu-icon {
  margin-right: 8px;
}

.menu-label {
  flex: 1;
}

/* Submenu styling */
.menu-item.has-submenu:hover .submenu {
  display: block;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 200px;
  list-style: none;
  padding: 0;
}

.submenu-item {
  border-bottom: 1px solid #eee;
}

.submenu-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
}

.submenu-link:hover {
  background: #f5f5f5;
}
```

## API Endpoints

### Fetch All Menus
```
GET /api/menus
```

### Fetch Menu by Location
```
GET /api/menus?where[location][equals]=header-primary&where[active][equals]=true
```

### Fetch Specific Menu
```
GET /api/menus/{id}
```

## Helper Functions

### `getMenuItemUrl(item: MenuItem): string`
Generates the correct URL based on menu item type

### `getMenuByLocation(location: string): Promise<Menu | null>`
Fetches menu data for a specific location

### `hasChildren(item: MenuItem): boolean`
Checks if a menu item has submenu items

### `getLinkTarget(item: MenuItem): string`
Returns '_blank' or '_self' based on openInNewTab setting

### `getLinkRel(item: MenuItem): string | undefined`
Returns appropriate rel attribute for external links

## Menu Types

### MenuItem Interface
```typescript
interface MenuItem {
  label: string
  type: 'custom' | 'blog' | 'service' | 'product' | 'project' | 'blog-category' | 'product-category'
  customUrl?: string
  blogPost?: any
  service?: any
  product?: any
  project?: any
  blogCategory?: any
  productCategory?: any
  icon?: string
  openInNewTab?: boolean
  cssClass?: string
  description?: string
  children?: MenuItem[]
  id?: string
}
```

### Menu Interface
```typescript
interface Menu {
  id: string
  name: string
  location: string
  items: MenuItem[]
  active: boolean
}
```

## Example: Complete Header with Menu

```tsx
import MenuFetcher from '@/components/MenuFetcher'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
        </Link>

        <MenuFetcher
          location="header-primary"
          className="main-navigation"
          fallback={
            <nav className="main-navigation">
              <ul className="menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          }
        />

        <button className="mobile-toggle">
          Menu
        </button>
      </div>
    </header>
  )
}
```

## Best Practices

1. **Use Descriptive Names**: Name menus clearly (e.g., "Header Navigation" not "Menu 1")
2. **Limit Nesting**: Keep submenu depth to 1 level for best UX
3. **Test Mobile**: Always test menu behavior on mobile devices
4. **Use Icons Sparingly**: Only add icons where they improve navigation
5. **Provide Fallbacks**: Use fallback prop in MenuFetcher for default navigation
6. **Cache Appropriately**: Menus are cached for 1 hour by default
7. **Keep It Simple**: Don't overcomplicate menu structures

## Troubleshooting

### Menu Not Appearing?

1. Check that menu is set to "Active"
2. Verify menu location matches your code
3. Ensure menu has items
4. Check API endpoint is accessible

### Links Not Working?

1. Verify link type is correct
2. Check that referenced items (blog posts, etc.) have slugs
3. Ensure custom URLs are properly formatted

### Styling Issues?

1. Inspect class names being applied
2. Check CSS specificity
3. Verify custom CSS classes in menu items

## Future Enhancements

Potential improvements to consider:

- Mega menu support with multiple columns
- Visual menu builder with drag-and-drop UI
- Menu item visibility rules (logged in/out, user roles)
- Menu item badges (New, Hot, etc.)
- Mobile-specific menu configurations
- Menu analytics and tracking

## Support

For issues or questions:
1. Check this README
2. Review the menu collection configuration in `src/collections/Menus.ts`
3. Inspect helper functions in `src/lib/menuHelpers.ts`
4. Test with browser developer tools

---

**Created with**: PayloadCMS + Next.js
**Version**: 1.0.0
