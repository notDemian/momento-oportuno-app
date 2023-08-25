export const Constants = {
  URL: {
    RAW: 'https://clicdelsureste.empresarialti.com/',
    get PROD() {
      return `${this.RAW}wp-json/wp/v2` as const
    },
    get DEV() {
      return `${this.RAW}wp-json/wp/v2` as const
    },
    get CUSTOM() {
      return `${this.RAW}wp-json` as const
    },
    get CUSTOM_DEV() {
      return `${this.RAW}wp-json` as const
    },
  },
  ENDPOINTS: {
    INDEX: '/',
    LISTINGS: '/listings',
    USERS: '/users',
    REGISTER: '/register',
    PRODUCT: '/product',
  },
  CUSTOM_ENDPOINTS: {
    logIn: '/jwt-auth/v1/token',
  },
  IS_DEV: true,
} as const

export type ENDPOINTS =
  (typeof Constants.ENDPOINTS)[keyof typeof Constants.ENDPOINTS]
