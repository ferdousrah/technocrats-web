'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import './CustomNav.css'

interface NavItem {
  label: string
  href: string
  icon?: string
}

interface NavCategory {
  title: string
  icon: string
  items: NavItem[]
  defaultOpen?: boolean
}

const navCategories: NavCategory[] = [
  {
    title: 'Dashboard',
    icon: '📊',
    items: [
      { label: 'Overview', href: '/admin' },
      { label: 'Analytics', href: '/admin/analytics' },
    ],
    defaultOpen: true,
  },
  {
    title: 'Content',
    icon: '📝',
    items: [
      { label: 'Blog Posts', href: '/admin/collections/blog' },
      { label: 'Projects', href: '/admin/collections/projects' },
      { label: 'Services', href: '/admin/collections/services' },
      { label: 'Products', href: '/admin/collections/products' },
      { label: 'Testimonials', href: '/admin/collections/testimonials' },
    ],
    defaultOpen: true,
  },
  {
    title: 'Media',
    icon: '🖼️',
    items: [
      { label: 'Media Library', href: '/admin/collections/media' },
    ],
    defaultOpen: false,
  },
  {
    title: 'Team',
    icon: '👥',
    items: [
      { label: 'Team Members', href: '/admin/collections/team-members' },
      { label: 'Users', href: '/admin/collections/users' },
    ],
    defaultOpen: false,
  },
  {
    title: 'Taxonomies',
    icon: '🏷️',
    items: [
      { label: 'Blog Categories', href: '/admin/collections/blog-categories' },
      { label: 'Blog Tags', href: '/admin/collections/blog-tags' },
      { label: 'Service Types', href: '/admin/collections/service-types' },
      { label: 'Product Categories', href: '/admin/collections/product-categories' },
    ],
    defaultOpen: false,
  },
  {
    title: 'Customer',
    icon: '💬',
    items: [
      { label: 'Contact Inquiries', href: '/admin/collections/contact-inquiries' },
    ],
    defaultOpen: false,
  },
]

export default function CustomNav() {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(navCategories.filter(cat => cat.defaultOpen).map(cat => cat.title))
  )

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(title)) {
        newSet.delete(title)
      } else {
        newSet.add(title)
      }
      return newSet
    })
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="custom-nav">
      <div className="custom-nav-header">
        <h2 className="custom-nav-title">Admin Panel</h2>
      </div>

      <div className="custom-nav-categories">
        {navCategories.map((category) => {
          const isExpanded = expandedCategories.has(category.title)

          return (
            <div key={category.title} className="nav-category">
              <button
                className={`nav-category-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleCategory(category.title)}
              >
                <span className="nav-category-icon">{category.icon}</span>
                <span className="nav-category-title">{category.title}</span>
                <span className={`nav-category-arrow ${isExpanded ? 'rotated' : ''}`}>
                  ▼
                </span>
              </button>

              <div className={`nav-category-items ${isExpanded ? 'expanded' : ''}`}>
                {category.items.map((item) => {
                  const active = isActive(item.href)

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`nav-item ${active ? 'active' : ''}`}
                    >
                      <span className="nav-item-label">{item.label}</span>
                      {active && <span className="nav-item-indicator">●</span>}
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="custom-nav-footer">
        <div className="nav-footer-info">
          <small>Technocrats Admin v1.0</small>
        </div>
      </div>
    </nav>
  )
}
