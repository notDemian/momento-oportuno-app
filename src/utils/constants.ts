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
    PACKAGES: '/packages',
    Listivos_CATEGORIAS: '/listivo_14',
    Listivos_ESTADOS: '/listivo_10934',
  },
  CUSTOM_ENDPOINTS: {
    logIn: '/jwt-auth/v1/token',
  },
  IS_DEV: true,
} as const

export type ENDPOINTS =
  (typeof Constants.ENDPOINTS)[keyof typeof Constants.ENDPOINTS]

/**
   * {
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NsaWNkZWxzdXJlc3RlLmVtcHJlc2FyaWFsdGkuY29tIiwiaWF0IjoxNjk0MTIyMjM1LCJuYmYiOjE2OTQxMjIyMzUsImV4cCI6MTY5NDcyNzAzNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTQifX19.B4iQzfjCCEijZbfh0RLsvizbccKwFJuuNx422Wp8BaY",
  "user_email": "Leslie.viri@gmail.com",
  "user_nicename": "leslieb",
  "user_display_name": "LeslieB"
}
   */
