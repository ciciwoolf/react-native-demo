import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';

// Define what theme modes we support
type Theme = 'light' | 'dark';

// Define what our theme context will provide
interface ThemeContextType {
  theme: Theme; // Current theme: 'light' or 'dark'
  colors: typeof Colors.light; // Current color palette
  toggleTheme: () => void; 
  isDark: boolean; // Helper: true if current theme is dark
}

// Create the context (initially undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props for our ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Key for storing theme preference in AsyncStorage
const THEME_STORAGE_KEY = '@app_theme';

/**
 * ThemeProvider Component
 *
 * This wraps the app and provides theme functionality to all child components.
 * It manages the current theme state and persists user preferences.
 */
export function CustomThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light theme
  const [isLoading, setIsLoading] = useState(true); // Loading state while we check saved preference

  // Load saved theme when app starts
  useEffect(() => {
    loadSavedTheme();
  }, []);

  /**
   * Load the user's saved theme preference from AsyncStorage
   */
  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
      // If there's an error, we'll just use the default 'light' theme
    } finally {
      setIsLoading(false); // We're done loading
    }
  };

  /**
   * Toggle between light and dark themes
   * Also saves the new preference to AsyncStorage
   */
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  // Get the appropriate color palette for the current theme
  const colors = theme === 'light' ? Colors.light : Colors.dark;
  const isDark = theme === 'dark';

  // Package everything up for our context
  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
    isDark,
  };

  // Don't render children until we've loaded the saved theme
  // This prevents a flash of the wrong theme on app startup
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 *
 * This is a custom hook that makes it easy to access theme data in any component.
 * Usage: const { colors, toggleTheme, isDark } = useTheme();
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
