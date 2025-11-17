'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'
import './mui-admin-scope.css'

// Create a custom MUI theme for the admin panel
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Scope MUI baseline styles to prevent conflicts with PayloadCMS
        body: {
          // Don't override body styles globally
        },
      },
    },
  },
})

interface MuiThemeProviderProps {
  children: ReactNode
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* Wrap in a div with a specific class to scope MUI styles */}
      <div className="mui-admin-scope">
        <CssBaseline />
        {children}
      </div>
    </ThemeProvider>
  )
}
