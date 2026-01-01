import { createTheme } from '@mui/material';

// Add custom variant for Typography
declare module '@mui/material/styles' {
  interface TypographyVariants {
    mono: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    mono?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mono: true;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f3f4f6', // Cool light grey
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Slate 800
      secondary: '#64748b', // Slate 500
    },
    primary: {
      main: '#0f172a', // Slate 900 (Deep, seemingly black)
    },
    secondary: {
      main: '#f59e0b', // Amber
    },
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    error: {
      main: '#ef4444',
      light: '#fee2e2',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
    h1: {
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 800,
      color: '#0f172a',
      letterSpacing: '-0.05em',
    },
    h2: {
      fontSize: '0.875rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '1rem',
      color: '#94a3b8', // Muted uppercase headers
    },
    h5: {
      fontWeight: 600,
      color: '#1e293b',
    },
    mono: {
      fontFamily: '"JetBrains Mono", monospace',
    },
    body1: {
      color: '#334155',
    },
  },
  shape: {
    borderRadius: 24, // Softer, modern rounded corners
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(circle at 50% 0%, #e2e8f0 0%, transparent 50%)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: 'none',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', // Soft, diffues shadow
          borderRadius: 24,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '12px 28px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }
        },
        containedPrimary: {
          backgroundColor: '#0f172a',
          '&:hover': {
            backgroundColor: '#1e293b',
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#f8fafc',
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0f172a',
            }
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#e2e8f0', // Light grey track
          borderRadius: 8,
        },
        bar: {
          borderRadius: 8,
        }
      }
    }
  }
});
