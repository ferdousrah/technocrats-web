'use client'

import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Chip, Avatar } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid'
import MuiThemeProvider from '../MuiThemeProvider'

interface CollectionDataGridProps {
  collection: string
  columns: GridColDef[]
  transformRow?: (doc: any) => any
  height?: number
}

export function CollectionDataGrid({
  collection,
  columns,
  transformRow,
  height = 700,
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
    <Box sx={{ height, width: '100%', p: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
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
