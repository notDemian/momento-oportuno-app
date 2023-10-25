export const Constants = {
  URL: {
    RAW: 'http://159.203.113.48/',
    get PROD() {
      return `${this.RAW}api` as const
    },
    get DEV() {
      return `${this.RAW}api` as const
    },
    get CUSTOM() {
      return `${this.RAW}api` as const
    },
    get CUSTOM_DEV() {
      return `${this.RAW}api` as const
    },
  },
  ENDPOINTS: {
    INDEX: '/',
    LISTINGS: '/listings',
    USERS: '/users',
    REGISTER: '/register',
    PRODUCT: '/product',
    FAVORITES: '/favorites',
    PACKAGES: '/packages',
    CATEGORIAS: '/categories',
    STATES: '/states',
    DIRECTORY: '/directories',
    MICROSITIOS: '/microsites',
    ORDERS: '/orders',
    UPLOAD_IMAGE: '/media',
    MEDIA: '/media',
  },
  IS_DEV: true,
  get API_URL() {
    return this.IS_DEV ? this.URL.DEV : this.URL.PROD
  },
  STRIPE: {
    PUBLISHABLE_KEY:
      'pk_test_51JNtfLEY6W5Ckq57baxsZaxjlEE5zZ0kPzyfbPOFylvo5AVmFd3iHQndDklrV1bXToC4RqYbfnZCauRjklFXBQPe00bII6O79s',
  },
} as const

export type ENDPOINTS =
  (typeof Constants.ENDPOINTS)[keyof typeof Constants.ENDPOINTS]

export const IMAGE_URL_FALLBACK = 'https://via.placeholder.com/150'
