export const Constants = {
  URL: {
    RAW: 'https://elmomentoapi.empresarialti.com/',
    // RAW: 'http://159.203.113.48/',
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
  FRONT_URL: {
    RAW: 'https://elmomentoop.empresarialti.com/',
    get str() {
      return this.RAW
    },
  },
  ENDPOINTS: {
    INDEX: '/',
    LISTINGS: '/listings',
    CHATS: '/chats',
    USERS: '/users',
    REGISTER: '/register',
    PRODUCT: '/product',
    FAVORITES: '/favorites',
    PACKAGES: '/packages',
    CATEGORIAS: '/categories',
    STATES: '/states',
    DIRECTORY: '/directories',
    MICROSITIOS: '/microsites',
    ADDONS: '/addons',
    ORDERS: '/orders',
    UPLOAD_IMAGE: '/media',
    MEDIA: '/media',
  },
  IS_DEV: true,
  get API_URL() {
    return this.IS_DEV ? this.URL.DEV : this.URL.PROD
  },
  STRIPE: {
    PK_DEV:
      'pk_test_51O3l3TKsMUZdYHBYf1tQxzYgxuI3AnwaHApYA8GFH9QR0mFkq222o9ISceK4Ucg1nQqZt9nkr4wr5Ryn1LBXwKRs00m40i9780',
    PK_PROD:
      'pk_test_51O3l3TKsMUZdYHBYf1tQxzYgxuI3AnwaHApYA8GFH9QR0mFkq222o9ISceK4Ucg1nQqZt9nkr4wr5Ryn1LBXwKRs00m40i9780',
  },
  get PUBLISHABLE_KEY() {
    return this.IS_DEV ? this.STRIPE.PK_DEV : this.STRIPE.PK_PROD
  },
  IDS: {
    price: 4,
    salary: 14,
    allStates: 5,
    variousCategory: 73,
  },
} as const

export type ENDPOINTS =
  (typeof Constants.ENDPOINTS)[keyof typeof Constants.ENDPOINTS]

export const IMAGE_URL_FALLBACK = 'https://via.placeholder.com/150'
