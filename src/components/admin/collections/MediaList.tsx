'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Avatar, Box } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'thumbnail',
    headerName: 'Preview',
    width: 100,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
        <Avatar
          src={params.value}
          alt={params.row.filename}
          variant="rounded"
          sx={{ width: 60, height: 60 }}
        />
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'filename',
    headerName: 'Filename',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'alt',
    headerName: 'Alt Text',
    width: 200,
  },
  {
    field: 'mimeType',
    headerName: 'Type',
    width: 150,
  },
  {
    field: 'filesize',
    headerName: 'Size',
    width: 120,
    valueFormatter: (value: any) => {
      if (!value) return 'N/A'
      const kb = value / 1024
      if (kb < 1024) return `${kb.toFixed(2)} KB`
      return `${(kb / 1024).toFixed(2)} MB`
    },
  },
  {
    field: 'width',
    headerName: 'Dimensions',
    width: 130,
    valueGetter: (value: any, row: any) => {
      if (row.width && row.height) return `${row.width}×${row.height}`
      return 'N/A'
    },
  },
  {
    field: 'createdAt',
    headerName: 'Uploaded',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

export default function MediaList() {
  return (
    <CollectionDataGridWithTheme
      collection="media"
      columns={columns}
      transformRow={(doc) => ({
        id: doc.id,
        thumbnail: doc.sizes?.thumbnail?.url || doc.url,
        filename: doc.filename,
        alt: doc.alt || '',
        mimeType: doc.mimeType,
        filesize: doc.filesize,
        width: doc.width,
        height: doc.height,
        createdAt: doc.createdAt,
      })}
      height={750}
    />
  )
}
