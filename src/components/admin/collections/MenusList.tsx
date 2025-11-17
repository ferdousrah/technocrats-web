'use client'

import CollectionDataGrid from './CollectionDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Menu Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 180,
    renderCell: (params) => {
      const locationLabels: Record<string, string> = {
        'header-primary': 'Header Primary',
        'header-secondary': 'Header Secondary',
        'footer-main': 'Footer Main',
        'footer-secondary': 'Footer Secondary',
        'mobile': 'Mobile',
        'sidebar': 'Sidebar',
      }
      return (
        <Chip
          label={locationLabels[params.value] || params.value}
          size="small"
          color="primary"
          variant="outlined"
        />
      )
    },
  },
  {
    field: 'itemsCount',
    headerName: 'Items',
    width: 100,
    renderCell: (params) => {
      const count = params.row.items?.length || 0
      return (
        <Chip
          label={count}
          size="small"
          color={count > 0 ? 'success' : 'default'}
        />
      )
    },
  },
  {
    field: 'active',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Active' : 'Inactive'}
        color={params.value ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Modified',
    width: 180,
    valueFormatter: (value) => {
      if (!value) return ''
      return new Date(value).toLocaleString()
    },
  },
]

export default function MenusList() {
  const transformRow = (doc: any) => {
    return {
      id: doc.id,
      name: doc.name,
      location: doc.location,
      items: doc.items,
      itemsCount: doc.items?.length || 0,
      active: doc.active,
      updatedAt: doc.updatedAt,
    }
  }

  return (
    <CollectionDataGrid
      collection="menus"
      columns={columns}
      transformRow={transformRow}
      title="Menu Management"
      height={750}
    />
  )
}
