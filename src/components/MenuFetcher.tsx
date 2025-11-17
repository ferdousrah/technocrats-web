import React from 'react'
import { getMenuByLocation } from '../lib/menuHelpers'
import Menu from './Menu'
import { MenuLocation } from '../types/menu'

interface MenuFetcherProps {
  location: MenuLocation
  className?: string
  itemClassName?: string
  subMenuClassName?: string
  fallback?: React.ReactNode
}

/**
 * Server Component that fetches and renders a menu by location
 *
 * Usage:
 * ```tsx
 * <MenuFetcher location="header-primary" className="header-nav" />
 * ```
 */
export default async function MenuFetcher({
  location,
  className,
  itemClassName,
  subMenuClassName,
  fallback,
}: MenuFetcherProps) {
  const menu = await getMenuByLocation(location)

  if (!menu || !menu.items || menu.items.length === 0) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <Menu
      items={menu.items}
      className={className}
      itemClassName={itemClassName}
      subMenuClassName={subMenuClassName}
    />
  )
}
