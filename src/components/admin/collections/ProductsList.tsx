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
    valueGetter: (value: any) => value?.name || 'N/A',
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    valueFormatter: (value: any) => {
      return value ? `$${value.toFixed(2)}` : 'N/A'
    },
  },
]

export default function ProductsList() {
  return (
    <CollectionDataGridWithTheme
      collection="products"
      columns={columns}
      transformRow={(doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        status: doc.status,
        category: doc.category,
        price: doc.price,
      })}
    />
  )
}
