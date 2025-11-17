'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 180,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      const colors: any = {
        new: 'error',
        read: 'warning',
        responded: 'success',
        archived: 'default',
      }
      return (
        <Chip
          label={params.value}
          color={colors[params.value] || 'default'}
          size="small"
        />
      )
    },
  },
  {
    field: 'createdAt',
    headerName: 'Received',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

export default function ContactInquiriesList() {
  return (
    <CollectionDataGridWithTheme
      collection="contact-inquiries"
      columns={columns}
      transformRow={(doc) => ({
        id: doc.id,
        name: doc.name,
        email: doc.email,
        company: doc.company || '',
        subject: doc.subject || 'No subject',
        status: doc.status || 'new',
        createdAt: doc.createdAt,
      })}
    />
  )
}
