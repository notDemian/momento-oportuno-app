import { ImageSourcePropType } from 'react-native'

import Chance from 'chance'
const chance = new Chance()

export type Profile = {
  id: string
  name: string
  email: string
  phone: string
  avatar: ImageSourcePropType
  coverPhoto: ImageSourcePropType
}

export const profile: Profile = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  name: chance.name(),
  email: chance.email(),
  phone: chance.phone(),
  avatar: require('../assets/profile/avatar.png'),
  coverPhoto: require('../assets/profile/cover-photo.jpg'),
}
