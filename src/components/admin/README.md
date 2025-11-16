# Custom Admin Components with Material-UI

This directory contains custom admin components built with Material-UI (MUI) for the PayloadCMS admin panel.

## Structure

```
src/components/admin/
├── dashboard/
│   └── CustomDashboard.tsx    # Main dashboard with stats and charts
├── views/
│   └── AnalyticsView.tsx      # Analytics view with detailed insights
├── fields/
│   └── ColorPickerField.tsx   # Example custom field with color picker
└── README.md                   # This file
```

## Available Components

### 1. Custom Dashboard (`CustomDashboard.tsx`)

A comprehensive dashboard that displays:
- **Statistics Cards**: Quick overview of all collections (Services, Products, Projects, Blog, etc.)
- **Charts**:
  - Pie chart showing content distribution
  - Bar chart showing categories and tags overview
- **Quick Actions**: Buttons to quickly create new content
- **Real-time Data**: Fetches live data from PayloadCMS API

**Features:**
- Responsive grid layout
- Clickable cards that navigate to collections
- Interactive charts using Recharts
- Material-UI components for consistent design

### 2. Analytics View (`AnalyticsView.tsx`)

A dedicated analytics page accessible at `/admin/analytics`:
- **Key Metrics**: Total content items, published posts, active services
- **Trend Chart**: Area chart showing content growth over time
- **Tabbed Interface**: Browse recent blog posts, services, and products
- **Interactive Tables**: Click rows to navigate to items

**Features:**
- Multiple tabs for different content types
- Trend indicators with percentage changes
- Responsive design
- Sortable and clickable data tables

### 3. Color Picker Field (`ColorPickerField.tsx`)

An example custom field component demonstrating MUI integration:
- Hex color input with visual preview
- Native color picker
- Live preview swatch
- Validation and helper text

## How to Use

### Using the Custom Dashboard

The custom dashboard is already configured in `payload.config.ts`:

```typescript
admin: {
  components: {
    Dashboard: './components/admin/dashboard/CustomDashboard',
  },
}
```

Access it by visiting `/admin` after logging in.

### Accessing Analytics View

Visit `/admin/analytics` to see the analytics view with detailed insights.

### Creating Custom Fields

To use the color picker field (or create your own):

1. **In a collection file** (e.g., `src/collections/ServiceTypes.ts`):

```typescript
import { ColorPickerField } from '../components/admin/fields/ColorPickerField'

export const ServiceTypes: CollectionConfig = {
  fields: [
    {
      name: 'color',
      type: 'text',
      admin: {
        components: {
          Field: ColorPickerField, // Use custom MUI field
        },
      },
    },
  ],
}
```

2. **Creating New Custom Fields**:

```typescript
'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { Box, TextField } from '@mui/material'
import type { TextFieldProps } from 'payload'

export const MyCustomField: React.FC<TextFieldProps> = (props) => {
  const { path } = props
  const { value, setValue } = useField<string>({ path })

  return (
    <Box>
      <TextField
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
    </Box>
  )
}
```

### Creating Additional Custom Views

To add more custom views:

1. **Create the component** in `src/components/admin/views/`:

```typescript
'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

export const MyCustomView: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">My Custom View</Typography>
      {/* Your content here */}
    </Box>
  )
}

export default MyCustomView
```

2. **Register in `payload.config.ts`**:

```typescript
admin: {
  components: {
    views: {
      myView: {
        Component: './components/admin/views/MyCustomView',
        path: '/my-view',
        exact: true,
      },
    },
  },
}
```

## Available MUI Components

All Material-UI components are available:

- **Layout**: Box, Container, Grid, Stack, Paper
- **Inputs**: TextField, Select, Checkbox, Radio, Switch
- **Data Display**: Table, Chip, Avatar, Badge, List, Typography
- **Feedback**: Alert, CircularProgress, Dialog, Snackbar
- **Navigation**: Tabs, Breadcrumbs, Menu
- **Surfaces**: Card, Accordion, AppBar

## Charts with Recharts

The dashboard uses Recharts for data visualization:

- **BarChart**: For comparing categories
- **PieChart**: For distribution analysis
- **LineChart**: For trends over time
- **AreaChart**: For stacked comparisons

## Best Practices

1. **Always use 'use client' directive** for components with interactivity
2. **Use PayloadCMS hooks** (`useField`, `useAuth`, etc.) for data access
3. **Keep components modular** and reusable
4. **Follow MUI theming** for consistent design
5. **Handle loading states** gracefully
6. **Make components responsive** using MUI's Grid system

## Examples

### Example: Custom Dashboard Widget

```typescript
'use client'

import { Box, Card, CardContent, Typography } from '@mui/material'

export const StatsWidget = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          {icon}
        </Box>
      </CardContent>
    </Card>
  )
}
```

### Example: Custom List Cell

```typescript
'use client'

import { Chip } from '@mui/material'

export const StatusCell = ({ cellData }) => {
  return (
    <Chip
      label={cellData}
      color={cellData === 'active' ? 'success' : 'default'}
      size="small"
    />
  )
}
```

## Resources

- [PayloadCMS Admin Components Docs](https://payloadcms.com/docs/admin/components)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Recharts Documentation](https://recharts.org/)

## Notes

- The dashboard automatically fetches data from PayloadCMS REST API
- All custom components have access to PayloadCMS context and hooks
- MUI components work seamlessly with PayloadCMS's existing styling
- Custom views appear in the admin navigation automatically
