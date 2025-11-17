'use client'

import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Chip, Avatar, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp, GridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import MuiThemeProvider from '../MuiThemeProvider'

interface CollectionDataGridProps {
  collection: string
  columns: GridColDef[]
  transformRow?: (doc: any) => any
  height?: number
  title?: string
}

// Custom toolbar with export functionality
function CustomToolbar({ rows, columns, collectionName }: { rows: GridRowsProp; columns: GridColDef[]; collectionName: string }) {
  const handleExportCSV = () => {
    // Get visible columns (excluding actions, images, etc.)
    const exportColumns = columns.filter(col => !col.field.includes('action') && col.field !== 'id')

    // Create CSV header
    const headers = exportColumns.map(col => col.headerName || col.field).join(',')

    // Create CSV rows
    const csvRows = rows.map(row => {
      return exportColumns.map(col => {
        let value = row[col.field]

        // Handle different data types
        if (value === null || value === undefined) {
          return ''
        }

        // Handle arrays (like categories, tags)
        if (Array.isArray(value)) {
          value = value.map(v => typeof v === 'object' ? v.name || v.title || v.id : v).join('; ')
        }

        // Handle objects (like relational data)
        if (typeof value === 'object' && value !== null) {
          value = value.name || value.title || value.email || value.id || JSON.stringify(value)
        }

        // Handle dates
        if (col.field.includes('At') || col.field.includes('date')) {
          try {
            value = new Date(value).toLocaleString()
          } catch (e) {
            // Keep original value if date parsing fails
          }
        }

        // Escape quotes and wrap in quotes if contains comma or quote
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }

        return stringValue
      }).join(',')
    })

    // Combine header and rows
    const csv = [headers, ...csvRows].join('\n')

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${collectionName}_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        size="small"
        startIcon={<DownloadIcon />}
        onClick={handleExportCSV}
        sx={{ ml: 1 }}
      >
        Export CSV
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter debounceMs={500} />
    </GridToolbarContainer>
  )
}

export function CollectionDataGrid({
  collection,
  columns,
  transformRow,
  height = 700,
  title,
}: CollectionDataGridProps) {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const limit = paginationModel.pageSize
        const page = paginationModel.page + 1

        const response = await fetch(`/api/${collection}?limit=${limit}&page=${page}&depth=2`)
        const data = await response.json()

        const transformedRows = transformRow
          ? data.docs.map(transformRow)
          : data.docs.map((doc: any) => ({ id: doc.id, ...doc }))

        setRows(transformedRows)
        setTotalDocs(data.totalDocs || 0)
      } catch (error) {
        console.error(`Error fetching ${collection} data:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collection, paginationModel, transformRow])

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header with Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {title && (
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            window.location.href = `/admin/collections/${collection}/create`
          }}
          sx={{ ml: 'auto' }}
        >
          Create New
        </Button>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: height - 100 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          slots={{
            toolbar: () => <CustomToolbar rows={rows} columns={columns} collectionName={collection} />
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          rowCount={totalDocs}
          paginationMode="server"
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={(params) => {
            window.location.href = `/admin/collections/${collection}/${params.id}`
          }}
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Box>
    </Box>
  )
}

// Wrapped version with theme provider
export default function CollectionDataGridWithTheme(props: CollectionDataGridProps) {
  return (
    <MuiThemeProvider>
      <CollectionDataGrid {...props} />
    </MuiThemeProvider>
  )
}
