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
      { label: 'Menus', href: '/admin/collections/menus' },
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
    items: [{ label: 'Media Library', href: '/admin/collections/media' }],
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
    items: [{ label: 'Contact Inquiries', href: '/admin/collections/contact-inquiries' }],
    defaultOpen: false,
  },
]

export default function CustomNav() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(navCategories.filter((cat) => cat.defaultOpen).map((cat) => cat.title)),
  )

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => {
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
    <nav className={`custom-nav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="custom-nav-header">
        <div className="nav-logo-container">
          <div className="nav-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="url(#gradient1)" />
              <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="white" opacity="0.9" />
              <path d="M20 15L25 18V24L20 27L15 24V18L20 15Z" fill="url(#gradient2)" />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="15"
                  y1="15"
                  x2="25"
                  y2="27"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="nav-logo-text">
              <h2 className="custom-nav-title">Technocrats</h2>
              <span className="nav-logo-subtitle">Admin Panel</span>
            </div>
          )}
        </div>
        <button
          className="nav-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isCollapsed ? 'rotated' : ''}
          >
            <path
              d="M12 5L7 10L12 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="custom-nav-categories">
        {navCategories.map((category) => {
          const isExpanded = expandedCategories.has(category.title)

          return (
            <div key={category.title} className="nav-category">
              <button
                className={`nav-category-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => !isCollapsed && toggleCategory(category.title)}
                title={isCollapsed ? category.title : ''}
              >
                <span className="nav-category-icon">{category.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="nav-category-title">{category.title}</span>
                    <span className={`nav-category-arrow ${isExpanded ? 'rotated' : ''}`}>▼</span>
                  </>
                )}
              </button>

              {!isCollapsed && (
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
              )}
            </div>
          )
        })}
      </div>

      {!isCollapsed && (
        <div className="custom-nav-footer">
          <div className="nav-footer-info">
            <small>Technocrats Admin v1.0</small>
          </div>
        </div>
      )}
    </nav>
  )
}
