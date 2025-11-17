'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Avatar, Box, Rating, Chip } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'clientPhoto',
    headerName: 'Photo',
    width: 80,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
        <Avatar
          src={params.value}
          alt={params.row.clientName}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'clientName',
    headerName: 'Client Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'clientRole',
    headerName: 'Role',
    width: 180,
  },
  {
    field: 'clientCompany',
    headerName: 'Company',
    width: 180,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 140,
    renderCell: (params) => (
      <Rating value={params.value || 0} readOnly size="small" />
    ),
  },
  {
    field: 'featured',
    headerName: 'Featured',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Yes' : 'No'}
        color={params.value ? 'primary' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Added',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

export default function TestimonialsList() {
  return (
    <CollectionDataGridWithTheme
      collection="testimonials"
      columns={columns}
      transformRow={(doc) => {
        const photo = typeof doc.clientPhoto === 'object' ? doc.clientPhoto?.url : doc.clientPhoto
        return {
          id: doc.id,
          clientPhoto: photo || '/img/default-avatar.png',
          clientName: doc.clientName,
          clientRole: doc.clientRole || '',
          clientCompany: doc.clientCompany || '',
          rating: doc.rating || 0,
          featured: doc.featured || false,
          createdAt: doc.createdAt,
        }
      }}
    />
  )
}
