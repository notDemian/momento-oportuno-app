import {ImageSourcePropType} from 'react-native';
import Chance from 'chance'
const chance = new Chance();

export type Driver = {
  id: string;
  name: string;
  ratings: string;
  averageRating: string;
  avatar: ImageSourcePropType;
};

export const driver: Driver = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  name: chance.name(),
  ratings: '144',
  averageRating: '4.6',
  avatar: require('@src/assets/drivers/avatar.png'),
};
