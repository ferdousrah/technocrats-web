'use client'

import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import CollectionDataGridWithTheme from './CollectionDataGrid'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 250,
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
    field: 'updatedAt',
    headerName: 'Updated',
    width: 150,
    valueFormatter: (value: any) => {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
]

interface TaxonomyListProps {
  collection: string
  title: string
}

export default function TaxonomyList({ collection, title }: TaxonomyListProps) {
  return (
    <CollectionDataGridWithTheme
      collection={collection}
      columns={columns}
      title={title}
      transformRow={(doc) => ({
        id: doc.id,
        name: doc.name,
        slug: doc.slug,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })}
      height={650}
    />
  )
}

// Specific exports for each taxonomy
export function ServiceTypesList() {
  return <TaxonomyList collection="service-types" title="Service Types" />
}

export function ProductCategoriesList() {
  return <TaxonomyList collection="product-categories" title="Product Categories" />
}

export function BlogCategoriesList() {
  return <TaxonomyList collection="blog-categories" title="Blog Categories" />
}

export function BlogTagsList() {
  return <TaxonomyList collection="blog-tags" title="Blog Tags" />
}
