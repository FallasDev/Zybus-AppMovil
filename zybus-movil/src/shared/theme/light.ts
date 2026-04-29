import type { AppTheme } from './types';
import { spacing } from './spacing';

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    brandBlue: '#152f52',
    brandYellow: '#fbd34f',
    background: '#f5f7fb',
    surface: '#ffffff',
    surfaceAlt: '#eef2f9',
    textPrimary: '#111111',
    textSecondary: '#6F6F6F',
    textOnBrand: '#ffffff',
    border: '#dcdcdc',
    inputBackground: '#f3f3f3',
    error: '#b42318',
    errorSurface: '#fff1f1',
    success: '#00AE31',
    overlay: 'rgba(0,0,0,0.35)',
    white: '#ffffff',
    black: '#000000',
  },
  spacing,
  typography: {
    xs: 12,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
};
