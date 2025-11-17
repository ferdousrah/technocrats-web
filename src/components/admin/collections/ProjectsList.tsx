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
    field: 'client',
    headerName: 'Client',
    width: 180,
  },
  {
    field: 'technologies',
    headerName: 'Technologies',
    width: 200,
    valueGetter: (value: any) => {
      return Array.isArray(value) ? value.join(', ') : 'None'
    },
  },
  {
    field: 'projectDate',
    headerName: 'Project Date',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

export default function ProjectsList() {
  return (
    <CollectionDataGridWithTheme
      collection="projects"
      columns={columns}
      title="Projects"
      transformRow={(doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        client: doc.client || 'N/A',
        technologies: doc.technologies || [],
        projectDate: doc.projectDate,
      })}
    />
  )
}
