// APIs
export const API = {
    URL: {
      BASE: 'https://6849b73d45f4c0f5ee729ac4.mockapi.io',
    },
    PATH: {
      ADD_TASK: '/api/v1/add',
    },
  } as const;
  
  // Regex
  export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // Password validation
  } as const;
  
  // Numbers
  export const NUMBERS = {
    COLUMNS: 2,
  } as const;
  
  export const LOCALIZATION_LANGUAGES = {
    en: 'english',
    ar: 'arabic',
  } as const;
  
  export const STRINGS = {
    EMPTY: '',
  } as const;

  export const Colors = {
    primary: '#007AFF',
    secondary: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',
    light: '#F5F5F5',
    dark: '#1C1C1E',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#8E8E93',
    lightGray: '#D1D1D6',
    darkGray: '#636366',
  };
  
  // Colors
  export const COLORS = {
    PRIMARY: '#3498db',
    SECONDARY: '#2ecc71',
    ERROR: '#e74c3c',
    BLACK: '#000000',
    SCREEN_BACKGROUND: '#f5f5f5'
  } as const;
  