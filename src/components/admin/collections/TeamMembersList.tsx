'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Avatar, Box } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'photo',
    headerName: 'Photo',
    width: 80,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
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

export default function TeamMembersList() {
  return (
    <CollectionDataGridWithTheme
      collection="team-members"
      columns={columns}
      title="Team Members"
      transformRow={(doc) => {
        const photo = typeof doc.photo === 'object' ? doc.photo?.url : doc.photo
        return {
          id: doc.id,
          photo: photo || '/img/default-avatar.png',
          name: doc.name,
          role: doc.role,
          email: doc.email || '',
          phone: doc.phone || '',
          createdAt: doc.createdAt,
        }
      }}
    />
  )
}
