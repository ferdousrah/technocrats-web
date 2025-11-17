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
  Chip,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid'
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
          fetch('/api/blog?limit=100&sort=-publishedDate').then(res => res.json()),
          fetch('/api/services?limit=100').then(res => res.json()),
          fetch('/api/products?limit=100').then(res => res.json()),
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
    { month: 'May', blog: 25, services: 16, products: 13 },
    { month: 'Jun', blog: 30, services: 18, products: 15 },
  ]

  // Blog Posts DataGrid Columns
  const blogColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'published' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      width: 150,
      valueFormatter: (value) => {
        return value ? new Date(value).toLocaleDateString() : 'Not set'
      },
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 200,
      valueGetter: (value: any) => {
        return Array.isArray(value) ? value.map((cat: any) => cat.name).join(', ') : 'None'
      },
    },
  ]

  const blogRows: GridRowsProp = blogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    status: post.status,
    publishedDate: post.publishedDate,
    categories: post.categories || [],
  }))

  // Services DataGrid Columns
  const serviceColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'serviceType',
      headerName: 'Type',
      width: 150,
      valueGetter: (value: any) => {
        return value?.name || 'N/A'
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 150,
      valueFormatter: (value: any) => {
        return value ? new Date(value).toLocaleDateString() : 'N/A'
      },
    },
  ]

  const serviceRows: GridRowsProp = services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    serviceType: service.serviceType,
    createdAt: service.createdAt,
  }))

  // Products DataGrid Columns
  const productColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Name',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value || 'draft'}
          color={params.value === 'published' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueGetter: (value: any) => {
        return value?.name || 'N/A'
      },
    },
  ]

  const productRows: GridRowsProp = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    status: product.status,
    category: product.category,
  }))

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ArticleIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Blog Posts
                  </Typography>
                  <Typography variant="h5">{blogPosts.length}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main', mt: 0.5 }}>
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {blogPosts.filter(p => p.status === 'published').length} Published
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VisibilityIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Services
                  </Typography>
                  <Typography variant="h5">{services.length}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    Active offerings
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ArticleIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h5">{products.length}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    In catalog
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trend Chart */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
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

      {/* Tabbed DataGrid Content */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`Blog Posts (${blogPosts.length})`} />
            <Tab label={`Services (${services.length})`} />
            <Tab label={`Products (${products.length})`} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={blogRows}
              columns={blogColumns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowClick={(params) => {
                window.location.href = `/admin/collections/blog/${params.id}`
              }}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={serviceRows}
              columns={serviceColumns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowClick={(params) => {
                window.location.href = `/admin/collections/services/${params.id}`
              }}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={productRows}
              columns={productColumns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowClick={(params) => {
                window.location.href = `/admin/collections/products/${params.id}`
              }}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Box>
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
