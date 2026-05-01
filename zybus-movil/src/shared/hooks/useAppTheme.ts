import { useThemeContext } from '../providers/ThemeProvider';
import type { AppTheme, ThemeMode } from '../theme/types';

export interface UseAppThemeReturn {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

export function useAppTheme(): UseAppThemeReturn {
  return useThemeContext();
}
