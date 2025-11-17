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
    field: 'serviceType',
    headerName: 'Type',
    width: 150,
    valueGetter: (value: any) => value?.name || 'N/A',
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

export default function ServicesList() {
  return (
    <CollectionDataGridWithTheme
      collection="services"
      columns={columns}
      transformRow={(doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        serviceType: doc.serviceType,
        createdAt: doc.createdAt,
      })}
    />
  )
}
