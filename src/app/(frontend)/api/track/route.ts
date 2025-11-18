import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  generateVisitorId,
  generateSessionId,
  getTrafficSource,
  getDeviceType,
  getBrowserName,
  getOSName,
  getClientIp,
  getCountryFromIp,
  formatDate,
  isSessionActive,
} from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse request body
    const body = await request.json()
    const {
      page,
      referrer,
      sessionId: clientSessionId,
      visitorId: clientVisitorId,
      utm,
      screenWidth,
      screenHeight,
      duration,
      exitPage,
    } = body

    // Get client information
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ip = getClientIp(request.headers)
    const { country, city } = await getCountryFromIp(ip)

    // Generate or use existing visitor ID
    const visitorId = clientVisitorId || generateVisitorId(ip, userAgent)

    // Check if visitor exists
    let visitor = await payload.find({
      collection: 'visitors',
      where: {
        visitorId: {
          equals: visitorId,
        },
      },
      limit: 1,
    })

    const isNewVisitor = visitor.docs.length === 0
    const now = new Date()

    // Create or update visitor
    if (isNewVisitor) {
      await payload.create({
        collection: 'visitors',
        data: {
          visitorId,
          firstVisit: now.toISOString(),
          lastVisit: now.toISOString(),
          sessionsCount: 1,
          totalPageViews: 1,
          totalDuration: duration || 0,
          averageDuration: duration || 0,
          country,
          city,
          device: getDeviceType(userAgent),
          browser: getBrowserName(userAgent),
          os: getOSName(userAgent),
        },
      })
    } else {
      const existingVisitor = visitor.docs[0]
      const updatedTotalPageViews = existingVisitor.totalPageViews + 1
      const updatedTotalDuration = (existingVisitor.totalDuration || 0) + (duration || 0)

      await payload.update({
        collection: 'visitors',
        id: existingVisitor.id,
        data: {
          lastVisit: now.toISOString(),
          totalPageViews: updatedTotalPageViews,
          totalDuration: updatedTotalDuration,
          averageDuration: updatedTotalDuration / existingVisitor.sessionsCount,
        },
      })
    }

    // Handle session
    let sessionId = clientSessionId
    let session: any = null

    if (clientSessionId) {
      // Check if session exists and is active
      const existingSession = await payload.find({
        collection: 'sessions',
        where: {
          sessionId: {
            equals: clientSessionId,
          },
        },
        limit: 1,
      })

      if (existingSession.docs.length > 0) {
        session = existingSession.docs[0]

        // Check if session is still active
        if (!isSessionActive(new Date(session.lastActivityAt || session.startedAt))) {
          // Session expired, create new one
          sessionId = generateSessionId()
          session = null
        }
      }
    } else {
      sessionId = generateSessionId()
    }

    const source = getTrafficSource(referrer, utm?.source) as 'direct' | 'organic' | 'social' | 'referral' | 'email' | 'paid' | 'other'

    // Create new session if needed
    if (!session) {
      session = await payload.create({
        collection: 'sessions',
        data: {
          sessionId,
          visitorId,
          isNew: isNewVisitor,
          startedAt: now.toISOString(),
          lastActivityAt: now.toISOString(),
          pageViews: 1,
          bounced: false, // Will update if visitor leaves after first page
          landingPage: page,
          referrer,
          source,
          country,
          city,
          device: getDeviceType(userAgent),
          browser: getBrowserName(userAgent),
          os: getOSName(userAgent),
          isActive: true,
        },
      })

      // Update visitor session count
      if (!isNewVisitor) {
        const existingVisitor = visitor.docs[0]
        await payload.update({
          collection: 'visitors',
          id: existingVisitor.id,
          data: {
            sessionsCount: existingVisitor.sessionsCount + 1,
          },
        })
      }
    } else {
      // Update existing session
      const updatedPageViews = session.pageViews + 1
      const sessionDuration = duration
        ? (session.duration || 0) + duration
        : session.duration || 0

      await payload.update({
        collection: 'sessions',
        id: session.id,
        data: {
          pageViews: updatedPageViews,
          duration: sessionDuration,
          exitPage: page,
          bounced: updatedPageViews === 1 && exitPage, // Bounced if leaving after first page
          lastActivityAt: now.toISOString(),
          isActive: true,
        },
      })
    }

    // Create page view record
    await payload.create({
      collection: 'page-views',
      data: {
        page,
        visitorId,
        sessionId,
        referrer,
        source: source as 'direct' | 'organic' | 'social' | 'referral' | 'email' | 'paid' | 'other',
        utm,
        country,
        city,
        device: getDeviceType(userAgent),
        browser: getBrowserName(userAgent),
        os: getOSName(userAgent),
        screenWidth,
        screenHeight,
        duration,
        exitPage: exitPage || false,
      },
    })

    return NextResponse.json({
      success: true,
      visitorId,
      sessionId,
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}
