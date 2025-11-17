import React from 'react'
import Link from 'next/link'
import { MenuItem } from '../types/menu'
import {
  getMenuItemUrl,
  hasChildren,
  getLinkTarget,
  getLinkRel,
} from '../lib/menuHelpers'

interface MenuProps {
  items: MenuItem[]
  className?: string
  itemClassName?: string
  subMenuClassName?: string
}

/**
 * Basic Menu Component
 * Renders a simple nested menu structure
 */
export default function Menu({
  items,
  className = '',
  itemClassName = '',
  subMenuClassName = '',
}: MenuProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <ul className={`menu ${className}`}>
      {items.map((item, index) => (
        <MenuItemComponent
          key={item.id || index}
          item={item}
          itemClassName={itemClassName}
          subMenuClassName={subMenuClassName}
        />
      ))}
    </ul>
  )
}

interface MenuItemProps {
  item: MenuItem
  itemClassName?: string
  subMenuClassName?: string
}

function MenuItemComponent({
  item,
  itemClassName = '',
  subMenuClassName = '',
}: MenuItemProps) {
  const url = getMenuItemUrl(item)
  const hasSubMenu = hasChildren(item)
  const target = getLinkTarget(item)
  const rel = getLinkRel(item)

  return (
    <li className={`menu-item ${hasSubMenu ? 'has-submenu' : ''} ${item.cssClass || ''} ${itemClassName}`}>
      <Link
        href={url}
        target={target}
        rel={rel}
        className="menu-link"
        title={item.description}
      >
        {item.icon && <span className={`menu-icon ${item.icon}`} />}
        <span className="menu-label">{item.label}</span>
        {hasSubMenu && <span className="menu-arrow">¼</span>}
      </Link>

      {hasSubMenu && (
        <ul className={`submenu ${subMenuClassName}`}>
          {item.children!.map((child, childIndex) => (
            <SubMenuItem
              key={child.id || childIndex}
              item={child}
              itemClassName={itemClassName}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function SubMenuItem({
  item,
  itemClassName = '',
}: {
  item: MenuItem
  itemClassName?: string
}) {
  const url = getMenuItemUrl(item)
  const target = getLinkTarget(item)
  const rel = getLinkRel(item)

  return (
    <li className={`submenu-item ${item.cssClass || ''} ${itemClassName}`}>
      <Link
        href={url}
        target={target}
        rel={rel}
        className="submenu-link"
        title={item.description}
      >
        {item.icon && <span className={`menu-icon ${item.icon}`} />}
        <span className="menu-label">{item.label}</span>
      </Link>
    </li>
  )
}
