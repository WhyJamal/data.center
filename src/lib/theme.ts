'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--font-manrope)',
    },
    palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
      secondary: '#90a1b9',
    },
  },
});

export default theme;
