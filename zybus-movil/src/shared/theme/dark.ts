import type { AppTheme } from './types';
import { spacing } from './spacing';

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    brandBlue: '#152f52',
    brandYellow: '#fbd34f',
    background: '#0f1923',
    surface: '#1a2736',
    surfaceAlt: '#243347',
    textPrimary: '#e8f0f8',
    textSecondary: '#8aa4bf',
    textOnBrand: '#ffffff',
    border: '#2a3d52',
    inputBackground: '#1a2736',
    error: '#9d1d14',
    errorSurface: '#2d1515',
    success: '#4ade80',
    overlay: 'rgba(0,0,0,0.6)',
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
