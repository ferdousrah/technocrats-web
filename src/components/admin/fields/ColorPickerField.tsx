'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { Box, TextField, Typography } from '@mui/material'

interface ColorPickerFieldProps {
  path: string
  label?: string
  required?: boolean
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = (props) => {
  const { path, label, required } = props
  const { value, setValue } = useField<string>({ path })

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          type="color"
          value={value || '#000000'}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: 100 }}
          size="small"
        />
        <TextField
          type="text"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#000000"
          sx={{ flexGrow: 1 }}
          size="small"
        />
        {value && (
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: value,
              border: '1px solid #ccc',
              borderRadius: 1,
            }}
          />
        )}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        Enter a hex color code (e.g., #FF6B6B) or use the color picker
      </Typography>
    </Box>
  )
}

export default ColorPickerField
