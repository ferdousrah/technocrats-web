import type { Access } from 'payload'

/**
 * Check if user has any of the specified roles
 */
export const hasRole = (user: any, roles: string[]): boolean => {
  if (!user || !user.roles) return false
  return user.roles.some((role: string) => roles.includes(role))
}

/**
 * Super Admin access - only super-admin role
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, ['super-admin'])
}

/**
 * Admin access - super-admin and admin roles
 */
export const isAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, ['super-admin', 'admin'])
}

/**
 * Editor access - super-admin, admin, and editor roles
 */
export const isEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['super-admin', 'admin', 'editor'])
}

/**
 * Author access - super-admin, admin, editor, and author roles
 */
export const isAuthor: Access = ({ req: { user } }) => {
  return hasRole(user, ['super-admin', 'admin', 'editor', 'author'])
}

/**
 * Authenticated access - any logged-in user
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return !!user
}

/**
 * Public read access - anyone can read
 */
export const isPublic: Access = () => true

/**
 * Admin or self access - user can access their own data or admins can access all
 */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, ['super-admin', 'admin'])) return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * Author or admin access for updates - authors can update their own content
 */
export const isAuthorOrAdmin = (authorField: string = 'author'): Access => {
  return ({ req: { user } }) => {
    if (!user) return false
    if (hasRole(user, ['super-admin', 'admin', 'editor'])) return true

    return {
      [authorField]: {
        equals: user.id,
      },
    }
  }
}
