'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    minWidth: 300,
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
    field: 'author',
    headerName: 'Author',
    width: 150,
    valueGetter: (value: any) => value?.name || 'Unknown',
  },
  {
    field: 'categories',
    headerName: 'Categories',
    width: 200,
    valueGetter: (value: any) => {
      return Array.isArray(value) ? value.map((cat: any) => cat.name).join(', ') : 'None'
    },
  },
  {
    field: 'publishedDate',
    headerName: 'Published',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'Not set'
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

export default function BlogList() {
  return (
    <CollectionDataGridWithTheme
      collection="blog"
      columns={columns}
      title="Blog Posts"
      transformRow={(doc) => ({
        id: doc.id,
        title: doc.title,
        status: doc.status,
        author: doc.author,
        categories: doc.categories || [],
        publishedDate: doc.publishedDate,
        updatedAt: doc.updatedAt,
      })}
    />
  )
}
