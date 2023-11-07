/* eslint-disable @typescript-eslint/ban-ts-comment */
import { palette } from './theme-palette'

import { createTheme } from '@shopify/restyle'

export const theme = createTheme({
  borderRadii: {
    none: 0,
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    xxl: 32,
    xxxl: 100,
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 64,
    '10%': '10%',
    '20%': '20%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
  },
  colors: {
    primary: palette.rojoMomento,
    secondary: palette.rojoMomento,
    orangy: palette.naranjaMomento,
    naranjaClarito: palette.naranjaClarito,
    creamy: palette.cream,
    background: palette.grisaceo,
    card: palette.white,
    text: palette.gray[800],
    border: palette.gray[300],
    danger: palette.red,
    warning: palette.yellow,
    success: palette.green,
    info: palette.blue,
    black: palette.black,
    yellow: palette.verdeMarcatextos,
    white: palette.white,
    transparent: 'transparent',
    facebook: palette.facebook,
    google: palette.google,
    gray: palette.gray[400],
    grayLight: palette.gray[300],
    stripe: palette.stripe,
    paypal: palette.paypal,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: 'text',
      fontSize: 16,
    },
    primary: {
      color: 'primary',
      fontSize: 16,
    },
    secondary: {
      color: 'secondary',
      fontSize: 14,
    },
    largeHeader: {
      fontWeight: 'bold',
      fontSize: 28,
    },
    header: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    subHeader: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    body: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 16,
    },
  },
  buttonVariants: {
    defaults: {
      backgroundColor: 'primary',
    },
    primary: {
      backgroundColor: 'primary',
    },
    orangy: {
      backgroundColor: 'orangy',
    },
    danger: {
      backgroundColor: 'danger',
    },
    warning: {
      backgroundColor: 'warning',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
    success: {
      backgroundColor: 'success',
    },
    info: {
      backgroundColor: 'info',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
    },
    stripe: {
      backgroundColor: 'stripe',
      borderWidth: 1,
      borderColor: 'stripe',
    },
    paypal: {
      backgroundColor: 'paypal',
      borderWidth: 1,
      borderColor: 'paypal',
    },
    transparent: {
      backgroundColor: 'transparent',
    },
    facebook: {
      backgroundColor: 'facebook',
    },
    google: {
      backgroundColor: 'google',
    },
  },
  buttonSizeVariants: {
    defaults: {
      paddingVertical: 'm',
      paddingHorizontal: 'm',
    },
    xs: {
      paddingVertical: 'xs',
      paddingHorizontal: 'xs',
    },
    s: {
      paddingVertical: 's',
      paddingHorizontal: 's',
    },
    m: {
      paddingVertical: 'm',
      paddingHorizontal: 'm',
    },
    l: {
      paddingVertical: 'l',
      paddingHorizontal: 'l',
    },
    bigHeader: {
      paddingVertical: 'l',
      paddingHorizontal: 'xxl',
    },
  },
  cardVariants: {
    defaults: {
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    flat: {
      borderWidth: 1,
      borderColor: 'border',
    },
  },
  cardCoverImageSizeVariants: {
    defaults: {
      height: 125,
    },
    s: {
      height: 100,
    },
    m: {
      height: 125,
    },
    l: {
      height: 150,
    },
  },
})

export type Theme = typeof theme

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    // @ts-ignore
    text: palette.gray[100],
    // @ts-ignore
    secondary: palette.gray[400],
    // @ts-ignore
    background: palette.gray[950],
    // @ts-ignore
    card: palette.gray[800],
    // @ts-ignore
    border: palette.gray[600],
  },
}
