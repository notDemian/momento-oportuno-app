import { ImageSourcePropType } from 'react-native'

import Chance from 'chance'
const chance = new Chance()

export type Dish = {
  id: string
  title: string
  description: string
  price: string
  image?: ImageSourcePropType
  coverImage?: ImageSourcePropType
  sideDishes?: DishSection[]
}

export type DishSection = {
  title: string
  data: RemarkablePlace[]
}

export type SimplePlace = {
  id: string
  title: string
  image: string
}

export type Place = SimplePlace & {
  coverImage?: string
  subTitle: string
  distance: number
  time: number
  rating: number
  dishSection?: DishSection[]
}

export type RemarkablePlace = {
  id: string
  title: string
  image: string
  price: number
  views: number
}

export type RemarkablePlaceTab = {
  [name: string]: Place[]
}

export const mockRecommendedByState: RemarkablePlace[] = [
  {
    title: 'Cachorros pomerania',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/D_NQ_NP_2X_712308-MLM48098538893_112021-F-300x200.webp',
  },
  {
    title: 'Renta casa moderna carretera carmen',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/3e3cd1aa-1032-4ccc-b3a4-a87813e72949-360x240.jpg',
  },
  {
    title: 'Cachorros',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2022/10/card_6-300x200.jpg.webp',
  },
  {
    title: 'Xiaomi Mi 10 5G',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2022/05/listing_3-300x200.jpg.webp',
  },

  {
    title: 'Hyundai Ioniq 2019',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/KMHC75LC4KU141463-01-300x200.jpg',
  },
  {
    title: 'Rottweiler gigante',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/D_NQ_NP_627963-MLM31981447132_082019-O-360x240.webp',
  },
  {
    title: 'Cachorro viejo pastor inglés',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/D_NQ_NP_2X_966696-MLM69590994079_052023-F-360x240.webp',
  },
  {
    title: 'Departamento moderno',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2021/10/apartments-3-300x200.jpg.webp',
  },

  {
    title: 'Ingeniero / Ejecutivo de Ventas',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2022/05/team-300x200.jpg.webp',
  },
  {
    title: 'Porsche Cayman 2.7',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/D_NQ_NP_687152-MLM69886534042_062023-O-360x240.webp',
  },
  {
    title: 'Venta de Casa en Francisco Montejo',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2023/07/D_NQ_NP_2X_939974-MLM70282949233_072023-F-360x240.webp',
  },
  {
    title: 'Control de Xbox Wireless',
    image:
      'https://clic.empresarialti.com/wp-content/uploads/2022/05/listing_1-300x200.jpg.webp',
  },
].map((_) => {
  return {
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    price: chance.floating({
      min: 5,
      max: 60,
    }),
    views: chance.integer({
      min: 100,
      max: 1000,
    }),
    ..._,
  }
})

export const mockDishDetails: Dish = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  title: chance.sentence({
    words: 5,
  }),
  description: chance.paragraph({
    sentences: 2,
  }),
  price: chance
    .floating({
      min: 5,
      max: 60,
    })
    .toString(),
  coverImage: require('@src/assets/dish-details/cover-photo.jpg'),
  sideDishes: [
    {
      title: 'Cake',
      data: mockRecommendedByState,
    },
  ],
}

export const mockPlaceDetails: Place = {
  id: '1',
  title: 'Neapolitan pizza, Italy. Neapolitan pizza',
  coverImage: require('@src/assets/place-details/cover-photo.jpg'),
  image: require('@src/assets/place-details/main-photo.jpg'),
  subTitle: 'Western, Spaghetti',
  distance: 75,
  time: 90,
  rating: 4,
  dishSection: [
    {
      title: 'Pasta',
      data: mockRecommendedByState,
      //   .map((_) => ({
      //     id: chance.string({
      //       length: 8,
      //       casing: 'upper',
      //       alpha: true,
      //       numeric: true,
      //     }),
      //     title: chance.sentence({
      //       words: 5,
      //     }),
      //     description: chance.paragraph({
      //       sentences: 2,
      //     }),
      //     price: chance
      //       .floating({
      //         min: 5,
      //         max: 60,
      //       })
      //       .toString(),
      //     image: require('@src/assets/dish-details/dish-1.jpg'),
      //   })),
    },
  ],
}

export const mockPlaceList: Place[] = Array(10)
  .fill(0)
  .map((_) => {
    const image =
      'https://clic.empresarialti.com/wp-content/uploads/2022/06/content_v4.jpeg.webp'
    return {
      id: chance.string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true,
      }),
      title: chance.company(),
      image,
      subTitle: chance.paragraph({
        sentences: 2,
      }),
      distance: 75,
      time: 90,
      rating: 4,
    }
  })

export const ESTADOS_APROBADOS = [
  'Quintana Roo',
  'Campeche',
  'Yucatán',
] as const
export const mockPlaces: Place[] = Array(3)
  .fill(0)
  .map((_, index) => {
    const images = [
      'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_qroo.jpeg',
      'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_campeche.jpeg',
      'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_yucatan.jpeg',
    ]

    return {
      id: chance.string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true,
      }),
      title: ESTADOS_APROBADOS[index],
      image: images[index],
      subTitle: chance.paragraph({
        sentences: 2,
      }),
      distance: 75,
      time: 90,
      rating: 4,
    }
  })

export const mockRemarkablePlace: RemarkablePlaceTab = {
  featured: [
    {
      id: '1',
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon - 200 Bui Thi Xuan',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'Moules frites, Belgium - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Khachapuri, Georgia',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  newest: [
    {
      id: '1',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Haggis, neeps and tatties, Scotland',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Haggis, neeps and tatties, Scotland',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  trending: [
    {
      id: '1',
      title: 'Spaghetti  - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'Gumbo, Louisiana, US - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Jollof rice, West Africa',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Singapore noodles, Hong Kong',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
}
