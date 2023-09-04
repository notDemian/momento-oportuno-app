import { ImageProps } from './Image.type'

import { createBox } from '@shopify/restyle'
import { Theme } from '@src/theme'
import { Image as ExpoImage } from 'expo-image'

export const Image = createBox<Theme, ImageProps>(ExpoImage)
