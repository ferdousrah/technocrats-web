import crypto from 'crypto'

// Generate a hash from IP address and user agent for visitor identification
export function generateVisitorId(ip: string, userAgent: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(`${ip}-${userAgent}`)
    .digest('hex')
  return hash.substring(0, 32)
}

// Generate a random session ID
export function generateSessionId(): string {
  return crypto.randomBytes(16).toString('hex')
}

// Determine traffic source from referrer
export function getTrafficSource(referrer: string | null, utmSource?: string): string {
  if (utmSource) {
    if (utmSource.includes('google') || utmSource.includes('bing')) return 'paid'
    if (utmSource.includes('facebook') || utmSource.includes('twitter') || utmSource.includes('linkedin')) return 'social'
    if (utmSource.includes('email')) return 'email'
    return 'other'
  }

  if (!referrer) return 'direct'

  const refLower = referrer.toLowerCase()

  // Social media
  if (refLower.includes('facebook') || refLower.includes('twitter') ||
      refLower.includes('linkedin') || refLower.includes('instagram') ||
      refLower.includes('youtube') || refLower.includes('pinterest')) {
    return 'social'
  }

  // Search engines
  if (refLower.includes('google') || refLower.includes('bing') ||
      refLower.includes('yahoo') || refLower.includes('duckduckgo')) {
    return 'organic'
  }

  // Other referrals
  return 'referral'
}

// Parse user agent to detect device type
export function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  const ua = userAgent.toLowerCase()

  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet'
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return 'mobile'

  return 'desktop'
}

// Extract browser name from user agent
export function getBrowserName(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('edge')) return 'Edge'
  if (ua.includes('chrome')) return 'Chrome'
  if (ua.includes('safari')) return 'Safari'
  if (ua.includes('opera')) return 'Opera'

  return 'Other'
}

// Extract OS name from user agent
export function getOSName(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('mac')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS'

  return 'Other'
}

// Get client IP address from request headers (works with proxies)
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return '0.0.0.0'
}

// Get country from IP (placeholder - would need GeoIP service)
export async function getCountryFromIp(ip: string): Promise<{ country?: string; city?: string }> {
  // In production, integrate with a GeoIP service like:
  // - ip-api.com (free tier available)
  // - ipinfo.io
  // - MaxMind GeoIP2

  // For now, return empty to avoid external dependencies
  // You can integrate a service later
  return {}
}

// Format date to YYYY-MM-DD
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// Check if session is still active (last activity < 30 minutes)
export function isSessionActive(lastActivityAt: Date): boolean {
  const now = new Date()
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000)
  return lastActivityAt > thirtyMinutesAgo
}
