'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import MuiThemeProvider from '../MuiThemeProvider'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export const AnalyticsView: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [blogRes, servicesRes, productsRes] = await Promise.all([
          fetch('/api/blog?limit=10&sort=-publishedDate').then(res => res.json()),
          fetch('/api/services?limit=10').then(res => res.json()),
          fetch('/api/products?limit=10').then(res => res.json()),
        ])

        setBlogPosts(blogRes.docs || [])
        setServices(servicesRes.docs || [])
        setProducts(productsRes.docs || [])
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Generate mock trend data for demonstration
  const trendData = [
    { month: 'Jan', blog: 12, services: 8, products: 5 },
    { month: 'Feb', blog: 15, services: 10, products: 7 },
    { month: 'Mar', blog: 18, services: 12, products: 9 },
    { month: 'Apr', blog: 22, services: 14, products: 11 },
    { month: 'May', blog: 25, services: 15, products: 13 },
    { month: 'Jun', blog: 28, services: 16, products: 15 },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Analytics & Insights
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Content Items
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {blogPosts.length + services.length + products.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      12% increase
                    </Typography>
                  </Box>
                </Box>
                <ArticleIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Published Blog Posts
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {blogPosts.filter(post => post.status === 'published').length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      8% increase
                    </Typography>
                  </Box>
                </Box>
                <VisibilityIcon sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Active Services
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {services.filter(service => service.status === 'active').length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      5% increase
                    </Typography>
                  </Box>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trend Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Content Growth Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="blog" stackId="1" stroke="#8884d8" fill="#8884d8" name="Blog Posts" />
            <Area type="monotone" dataKey="services" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Services" />
            <Area type="monotone" dataKey="products" stackId="1" stroke="#ffc658" fill="#ffc658" name="Products" />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>

      {/* Tabbed Content */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Recent Blog Posts" />
            <Tab label="Services Overview" />
            <Tab label="Products Overview" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Published Date</TableCell>
                  <TableCell>Read Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' } }}
                    onClick={() => window.location.href = `/admin/collections/blog/${post.id}`}
                  >
                    <TableCell>{post.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={post.status}
                        color={post.status === 'published' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : 'Not set'}
                    </TableCell>
                    <TableCell>{post.readTime ? `${post.readTime} min` : 'N/A'}</TableCell>
                  </TableRow>
                ))}
                {blogPosts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Featured</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow
                    key={service.id}
                    sx={{ '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' } }}
                    onClick={() => window.location.href = `/admin/collections/services/${service.id}`}
                  >
                    <TableCell>{service.title}</TableCell>
                    <TableCell>
                      <Chip
                        label={service.status}
                        color={service.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={service.featured ? 'Yes' : 'No'}
                        color={service.featured ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No services found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Featured</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' } }}
                    onClick={() => window.location.href = `/admin/collections/products/${product.id}`}
                  >
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.status}
                        color={product.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.featured ? 'Yes' : 'No'}
                        color={product.featured ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  )
}

// Wrap with MUI Theme Provider to isolate styles
export default function AnalyticsViewWithTheme() {
  return (
    <MuiThemeProvider>
      <AnalyticsView />
    </MuiThemeProvider>
  )
}
