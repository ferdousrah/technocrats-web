'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import MuiThemeProvider from '../MuiThemeProvider'
import './AnalyticsView.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658']

interface AnalyticsData {
  summary: {
    totalUniqueVisitors: number
    totalPageViews: number
    currentVisitorsOnline: number
    averageTimeStay: number
    newVisitors: number
    returningVisitors: number
    bounceRate: number
  }
  topPages: Array<{ page: string; views: number }>
  trafficSources: Array<{ source: string; sessions: number }>
  countryStats: Array<{ country: string; visitors: number }>
  dailyStats: Array<{
    date: string
    visitors: number
    sessions: number
    newVisitors: number
    returningVisitors: number
    bounceRate: number
  }>
}

function AnalyticsViewContent() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(7) // Days

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics?days=${timeRange}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (loading) {
    return (
      <div className="analytics-view">
        <div className="analytics-loading">Loading analytics...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="analytics-view">
        <div className="analytics-error">Failed to load analytics data</div>
      </div>
    )
  }

  return (
    <div className="analytics-view">
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <div className="time-range-selector">
            <button
              className={timeRange === 7 ? 'active' : ''}
              onClick={() => setTimeRange(7)}
            >
              Last 7 Days
            </button>
            <button
              className={timeRange === 30 ? 'active' : ''}
              onClick={() => setTimeRange(30)}
            >
              Last 30 Days
            </button>
            <button
              className={timeRange === 90 ? 'active' : ''}
              onClick={() => setTimeRange(90)}
            >
              Last 90 Days
            </button>
          </div>
        </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-label">Total Unique Visitors</div>
          <div className="summary-value">{data.summary.totalUniqueVisitors.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Total Page Views</div>
          <div className="summary-value">{data.summary.totalPageViews.toLocaleString()}</div>
        </div>

        <div className="summary-card highlight">
          <div className="summary-label">Current Visitors Online</div>
          <div className="summary-value">
            {data.summary.currentVisitorsOnline.toLocaleString()}
            <span className="online-indicator"></span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Average Time Stay</div>
          <div className="summary-value">{formatDuration(data.summary.averageTimeStay)}</div>
        </div>

        <div className="summary-card">
          <div className="summary-label">New Visitors</div>
          <div className="summary-value">{data.summary.newVisitors.toLocaleString()}</div>
          <div className="summary-subtitle">
            in last {timeRange} days
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Bounce Rate</div>
          <div className="summary-value">{data.summary.bounceRate}%</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="analytics-charts">
        {/* Visitors Over Time - Line Chart */}
        <div className="chart-card full-width">
          <h3>Visitors - Last {timeRange} Days</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#0088FE"
                strokeWidth={2}
                name="Unique Visitors"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* New vs Returning Visitors - Line Chart */}
        <div className="chart-card full-width">
          <h3>New vs Returning Visitors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newVisitors"
                stroke="#00C49F"
                strokeWidth={2}
                name="New Visitors"
              />
              <Line
                type="monotone"
                dataKey="returningVisitors"
                stroke="#FF8042"
                strokeWidth={2}
                name="Returning Visitors"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bounce Rate - Line Chart */}
        <div className="chart-card full-width">
          <h3>Bounce Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bounceRate"
                stroke="#FFBB28"
                strokeWidth={2}
                name="Bounce Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic by Source - Pie Chart */}
        <div className="chart-card half-width">
          <h3>Traffic by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.trafficSources}
                dataKey="sessions"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry: any) =>
                  `${entry.source}: ${((entry.percent || 0) * 100).toFixed(0)}%`
                }
              >
                {data.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages - Bar Chart */}
        <div className="chart-card half-width">
          <h3>Top Pages by Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topPages.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="page"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884D8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Country Stats - Bar Chart */}
        <div className="chart-card full-width">
          <h3>Visitors by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.countryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Tables */}
      <div className="analytics-tables">
        <div className="table-card">
          <h3>Top Pages</h3>
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {data.topPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h3>Traffic Sources</h3>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {data.trafficSources.map((source, index) => (
                <tr key={index}>
                  <td style={{ textTransform: 'capitalize' }}>{source.source}</td>
                  <td>{source.sessions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h3>Countries</h3>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Visitors</th>
              </tr>
            </thead>
            <tbody>
              {data.countryStats.map((country, index) => (
                <tr key={index}>
                  <td>{country.country}</td>
                  <td>{country.visitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Wrap with MUI Theme Provider for consistency with CustomDashboard
export default function AnalyticsView() {
  return (
    <MuiThemeProvider>
      <AnalyticsViewContent />
    </MuiThemeProvider>
  )
}
