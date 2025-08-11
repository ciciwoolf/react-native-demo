const richBlack = '#001011';
const mikadoYellow = '#ffc53a';
const white = '#ffffff';
const moonstone = '#009fb7';
const russianViolet = '#20063b';
const lightGray = '#f5f5f5';
const mediumGray = '#e0e0e0';
const darkGray = '#666666';
const successGreen = '#d4edda';
const dangerRed = '#dc3545';

export const Colors = {
  light: {
    text: richBlack,
    background: white,
    tint: moonstone,
    icon: darkGray,
    tabIconDefault: darkGray,
    tabIconSelected: moonstone,

    // Task manager specific colors
    primary: moonstone,
    secondary: mikadoYellow,
    accent: russianViolet,
    danger: dangerRed,
    success: successGreen,

    textSecondary: darkGray,
    textMuted: '#999999',
    textLight: '#cccccc',

    backgroundSecondary: lightGray,
    backgroundSuccess: successGreen,

    border: mediumGray,
    borderLight: '#dddddd',
  },
  dark: {
    text: white,
    background: richBlack,
    tint: mikadoYellow,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: mikadoYellow,

    // Task manager specific colors
    primary: mikadoYellow,
    secondary: moonstone,
    accent: '#6a4c93', // Lighter purple for dark mode
    danger: '#ff6b6b',
    success: '#51cf66',

    textSecondary: '#cccccc',
    textMuted: '#999999',
    textLight: '#666666',

    backgroundSecondary: '#1a1a1a',
    backgroundSuccess: '#2d5a2d',

    border: '#333333',
    borderLight: '#444444',
  },
};

// Spacing and typography constants
export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
  small: {
    fontSize: 14,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
};

export const borderRadius = {
  sm: 8,
  md: 15,
  lg: 20,
};
