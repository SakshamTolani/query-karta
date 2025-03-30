import { extendTheme } from '@chakra-ui/react';


export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  colors: {
    brand: {
      50: '#f0e7ff',  
      100: '#dcc9ff',
      200: '#b794f4',
      300: '#9f69ff',
      400: '#8744ff',
      500: '#6B21FF', 
      600: '#5718cc',
      700: '#441299',
      800: '#300c66',
      900: '#1d0733'
    },
    accent: {
      50: '#fff1f2',  
      100: '#ffd9e4',
      200: '#ffa3c0',
      300: '#ff679d',
      400: '#ff2d7a',
      500: '#FF0057',  
      600: '#cc0046',
      700: '#990034',
      800: '#660023',
      900: '#330011'
    },
    background: {
      50: '#ffffff',
      100: '#fafafa',
      900: '#16141c'  
    },
    editor: {
      bg: '#16141c', 
      text: '#ffffff',
      lineNumber: '#6B21FF',
      activeLine: '#1d0733',
      selection: 'rgba(255, 0, 87, 0.2)',
      cursor: '#FF0057'
    },
    action: {
      primary: '#6B21FF',  
      secondary: '#FF0057',
      success: '#0098FF',  
      error: '#FF3D71',    
      warning: '#FFAA00'   
    }
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(107, 33, 255, 0.4)'
          }
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50'
          }
        }
      }
    },
    Table: {
      variants: {
        simple: {
          th: {
            bg: 'brand.500',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wider'
          },
          td: {
            borderColor: 'brand.100'
          },
          tr: {
            _hover: {
              bg: 'brand.50'
            }
          }
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'background.50',
        color: 'background.900'
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px'
      },
      '::-webkit-scrollbar-track': {
        bg: 'brand.50'
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'brand.300',
        borderRadius: 'full',
        _hover: {
          bg: 'brand.400'
        }
      },
      '.monaco-editor .suggest-widget': {
        zIndex: 100,
      },
      '.monaco-editor .codicon': {
        fontFamily: 'inherit !important'
      },
      '.execute-query-container': {
        zIndex: '1000 !important',
        position: 'relative !important',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      },
      '*': {
        willChange: 'auto',
      }
    }
  }
});