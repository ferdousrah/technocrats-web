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
} from '@mui/material'
import {
  Article as ArticleIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  RateReview as ReviewIcon,
  ContactMail as ContactIcon,
  Work as WorkIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
} from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import MuiThemeProvider from '../MuiThemeProvider'

interface StatCardProps {
  title: string
  count: number
  icon: React.ReactNode
  color: string
  link: string
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color, link }) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={() => window.location.href = link}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
              {count}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export const CustomDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch counts from all collections
        const [
          services,
          products,
          projects,
          blog,
          teamMembers,
          testimonials,
          contacts,
          serviceTypes,
          productCategories,
          blogCategories,
          blogTags,
        ] = await Promise.all([
          fetch('/api/services?limit=0').then(res => res.json()),
          fetch('/api/products?limit=0').then(res => res.json()),
          fetch('/api/projects?limit=0').then(res => res.json()),
          fetch('/api/blog?limit=0').then(res => res.json()),
          fetch('/api/team-members?limit=0').then(res => res.json()),
          fetch('/api/testimonials?limit=0').then(res => res.json()),
          fetch('/api/contact-inquiries?limit=0').then(res => res.json()),
          fetch('/api/service-types?limit=0').then(res => res.json()),
          fetch('/api/product-categories?limit=0').then(res => res.json()),
          fetch('/api/blog-categories?limit=0').then(res => res.json()),
          fetch('/api/blog-tags?limit=0').then(res => res.json()),
        ])

        setStats({
          services: services.totalDocs || 0,
          products: products.totalDocs || 0,
          projects: projects.totalDocs || 0,
          blog: blog.totalDocs || 0,
          teamMembers: teamMembers.totalDocs || 0,
          testimonials: testimonials.totalDocs || 0,
          contacts: contacts.totalDocs || 0,
          serviceTypes: serviceTypes.totalDocs || 0,
          productCategories: productCategories.totalDocs || 0,
          blogCategories: blogCategories.totalDocs || 0,
          blogTags: blogTags.totalDocs || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats({
          services: 0,
          products: 0,
          projects: 0,
          blog: 0,
          teamMembers: 0,
          testimonials: 0,
          contacts: 0,
          serviceTypes: 0,
          productCategories: 0,
          blogCategories: 0,
          blogTags: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  const contentChartData = [
    { name: 'Services', value: stats?.services || 0 },
    { name: 'Products', value: stats?.products || 0 },
    { name: 'Projects', value: stats?.projects || 0 },
    { name: 'Blog Posts', value: stats?.blog || 0 },
  ]

  const categoryChartData = [
    { name: 'Service Types', count: stats?.serviceTypes || 0 },
    { name: 'Product Categories', count: stats?.productCategories || 0 },
    { name: 'Blog Categories', count: stats?.blogCategories || 0 },
    { name: 'Blog Tags', count: stats?.blogTags || 0 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Tech Company Dashboard
      </Typography>

      {/* Main Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Services"
            count={stats?.services || 0}
            icon={<BusinessIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#1976d2"
            link="/admin/collections/services"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Products"
            count={stats?.products || 0}
            icon={<InventoryIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#2e7d32"
            link="/admin/collections/products"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Projects"
            count={stats?.projects || 0}
            icon={<WorkIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#ed6c02"
            link="/admin/collections/projects"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Blog Posts"
            count={stats?.blog || 0}
            icon={<ArticleIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#9c27b0"
            link="/admin/collections/blog"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Team Members"
            count={stats?.teamMembers || 0}
            icon={<PeopleIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#0288d1"
            link="/admin/collections/team-members"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Testimonials"
            count={stats?.testimonials || 0}
            icon={<ReviewIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#d32f2f"
            link="/admin/collections/testimonials"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Contact Inquiries"
            count={stats?.contacts || 0}
            icon={<ContactIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#f57c00"
            link="/admin/collections/contact-inquiries"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories & Tags"
            count={(stats?.serviceTypes || 0) + (stats?.productCategories || 0) + (stats?.blogCategories || 0) + (stats?.blogTags || 0)}
            icon={<CategoryIcon sx={{ color: 'white', fontSize: 32 }} />}
            color="#5e35b1"
            link="/admin/collections/service-types"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Content Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Categories & Tags Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item>
            <Box
              component="a"
              href="/admin/collections/blog/create"
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1.5,
                backgroundColor: '#1976d2',
                color: 'white',
                borderRadius: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Create New Blog Post
            </Box>
          </Grid>
          <Grid item>
            <Box
              component="a"
              href="/admin/collections/services/create"
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1.5,
                backgroundColor: '#2e7d32',
                color: 'white',
                borderRadius: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              Add New Service
            </Box>
          </Grid>
          <Grid item>
            <Box
              component="a"
              href="/admin/collections/products/create"
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1.5,
                backgroundColor: '#ed6c02',
                color: 'white',
                borderRadius: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#e65100',
                },
              }}
            >
              Add New Product
            </Box>
          </Grid>
          <Grid item>
            <Box
              component="a"
              href="/admin/collections/contact-inquiries"
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1.5,
                backgroundColor: '#f57c00',
                color: 'white',
                borderRadius: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#ef6c00',
                },
              }}
            >
              View Contact Inquiries
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

// Wrap with MUI Theme Provider to isolate styles
export default function CustomDashboardWithTheme() {
  return (
    <MuiThemeProvider>
      <CustomDashboard />
    </MuiThemeProvider>
  )
}
