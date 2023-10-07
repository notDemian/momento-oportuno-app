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
    DIRECTORY: '/directories',
    MICROSITIOS: '/microsites',
    UPLOAD_IMAGE: '/media',
  },
  CUSTOM_ENDPOINTS: {
    logIn: '/jwt-auth/v1/token',
    wc: '/wc/v3',
  },
  WOOCOMMERCE: {
    PUBLIC_CLIENT: 'ck_2ce36694dbee497c906c77051616afdf4cd19cc3',
    SECRET_CLIENT: 'cs_4d0c83b48f3e6360ba95afc332fa1f3861bf07b4',
    get SAFE_b64_TOKEN() {
      // const kUser = `${Constants.WOOCOMMERCE.PUBLIC_CLIENT}:${Constants.WOOCOMMERCE.SECRET_CLIENT}`
      const kUser = `${this.PUBLIC_CLIENT}:${this.SECRET_CLIENT}`
      const base64 = Buffer.from(kUser).toString('base64')
      return base64
    },
  },
  IS_DEV: true,
  IDS: {
    Listivo_130: 130,
    Listivo_14: 14,
  },
} as const

export type ENDPOINTS =
  (typeof Constants.ENDPOINTS)[keyof typeof Constants.ENDPOINTS]
