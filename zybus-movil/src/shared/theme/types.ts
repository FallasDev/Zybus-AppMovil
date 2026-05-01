export type ThemeMode = 'light' | 'dark';

export interface AppThemeColors {
  brandBlue: string;
  brandYellow: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  textPrimary: string;
  textSecondary: string;
  textOnBrand: string;
  border: string;
  inputBackground: string;
  error: string;
  errorSurface: string;
  success: string;
  overlay: string;
  white: string;
  black: string;
}

export interface AppSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface AppTypography {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface AppTheme {
  mode: ThemeMode;
  colors: AppThemeColors;
  spacing: AppSpacing;
  typography: AppTypography;
}

export interface ThemeContextValue {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
}
