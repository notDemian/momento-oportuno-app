import { ImageProps } from '../../Image'

import { VariantProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

export type CardCoverImageSizeVariants = VariantProps<
  Theme,
  'cardCoverImageSizeVariants',
  'size'
>

export type CardCoverImageProps = {
  shouldFill?: boolean
} & ImageProps &
  CardCoverImageSizeVariants
