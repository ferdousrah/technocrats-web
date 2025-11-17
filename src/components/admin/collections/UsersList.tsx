'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Chip, Avatar } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'roles',
    headerName: 'Roles',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'admin' ? 'error' : 'primary'}
        size="small"
      />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
  {
    field: 'lastLoggedIn',
    headerName: 'Last Login',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'Never'
    },
  },
]

export default function UsersList() {
  return (
    <CollectionDataGridWithTheme
      collection="users"
      columns={columns}
      transformRow={(doc) => ({
        id: doc.id,
        name: doc.name || 'No name',
        email: doc.email,
        roles: Array.isArray(doc.roles) ? doc.roles.join(', ') : 'user',
        createdAt: doc.createdAt,
        lastLoggedIn: doc.lastLoggedIn,
      })}
    />
  )
}
