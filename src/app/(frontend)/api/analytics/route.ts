import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { formatDate, isSessionActive } from '@/lib/analytics'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '7')

    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    // Get unique visitors (total all time)
    const allVisitors = await payload.find({
      collection: 'visitors',
      limit: 0, // Just count
    })

    // Get total page views (total all time)
    const allPageViews = await payload.find({
      collection: 'page-views',
      limit: 0,
    })

    // Get visitors for the selected time period
    const recentVisitors = await payload.find({
      collection: 'visitors',
      where: {
        lastVisit: {
          greater_than_equal: startDate.toISOString(),
        },
      },
    })

    // Get page views for the selected time period
    const recentPageViews = await payload.find({
      collection: 'page-views',
      where: {
        createdAt: {
          greater_than_equal: startDate.toISOString(),
        },
      },
      limit: 10000, // Adjust as needed
    })

    // Get sessions for the selected time period
    const recentSessions = await payload.find({
      collection: 'sessions',
      where: {
        startedAt: {
          greater_than_equal: startDate.toISOString(),
        },
      },
      limit: 10000,
    })

    // Calculate top pages
    const pageViewsMap = new Map<string, number>()
    recentPageViews.docs.forEach((pv: any) => {
      const count = pageViewsMap.get(pv.page) || 0
      pageViewsMap.set(pv.page, count + 1)
    })

    const topPages = Array.from(pageViewsMap.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Calculate traffic by source
    const sourceMap = new Map<string, number>()
    recentSessions.docs.forEach((session: any) => {
      const source = session.source || 'direct'
      const count = sourceMap.get(source) || 0
      sourceMap.set(source, count + 1)
    })

    const trafficSources = Array.from(sourceMap.entries())
      .map(([source, sessions]) => ({ source, sessions }))
      .sort((a, b) => b.sessions - a.sessions)

    // Calculate country stats
    const countryMap = new Map<string, number>()
    recentVisitors.docs.forEach((visitor: any) => {
      if (visitor.country) {
        const count = countryMap.get(visitor.country) || 0
        countryMap.set(visitor.country, count + 1)
      }
    })

    const countryStats = Array.from(countryMap.entries())
      .map(([country, visitors]) => ({ country, visitors }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10)

    // Calculate current visitors online (sessions active in last 30 min)
    const activeSessionsCount = recentSessions.docs.filter((session: any) => {
      return session.isActive && isSessionActive(new Date(session.lastActivityAt || session.startedAt))
    }).length

    // Calculate average time stay
    const totalDuration = recentSessions.docs.reduce((sum: number, session: any) => {
      return sum + (session.duration || 0)
    }, 0)
    const averageTimeStay = recentSessions.docs.length > 0
      ? Math.round(totalDuration / recentSessions.docs.length)
      : 0

    // Calculate new vs returning visitors
    const newVisitorsSessions = recentSessions.docs.filter((s: any) => s.isNew).length
    const returningVisitorsSessions = recentSessions.docs.length - newVisitorsSessions

    // Calculate bounce rate
    const bouncedSessions = recentSessions.docs.filter((s: any) => s.bounced).length
    const bounceRate = recentSessions.docs.length > 0
      ? Math.round((bouncedSessions / recentSessions.docs.length) * 100)
      : 0

    // Get daily stats for the last 7 days (for line charts)
    const dailyStatsData = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = formatDate(date)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      // Get sessions for this day
      const daySessions = recentSessions.docs.filter((s: any) => {
        const sessionDate = new Date(s.startedAt)
        return sessionDate >= dayStart && sessionDate <= dayEnd
      })

      // Get unique visitors for this day
      const dayVisitorIds = new Set(daySessions.map((s: any) => s.visitorId))

      // Calculate bounce rate for this day
      const dayBouncedSessions = daySessions.filter((s: any) => s.bounced).length
      const dayBounceRate = daySessions.length > 0
        ? Math.round((dayBouncedSessions / daySessions.length) * 100)
        : 0

      // New vs returning for this day
      const dayNewVisitors = daySessions.filter((s: any) => s.isNew).length
      const dayReturningVisitors = daySessions.length - dayNewVisitors

      dailyStatsData.push({
        date: dateStr,
        visitors: dayVisitorIds.size,
        sessions: daySessions.length,
        newVisitors: dayNewVisitors,
        returningVisitors: dayReturningVisitors,
        bounceRate: dayBounceRate,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalUniqueVisitors: allVisitors.totalDocs,
          totalPageViews: allPageViews.totalDocs,
          currentVisitorsOnline: activeSessionsCount,
          averageTimeStay,
          newVisitors: newVisitorsSessions,
          returningVisitors: returningVisitorsSessions,
          bounceRate,
        },
        topPages,
        trafficSources,
        countryStats,
        dailyStats: dailyStatsData,
      },
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
