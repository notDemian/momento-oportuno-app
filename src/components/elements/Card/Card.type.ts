import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native/types'
import { TextProps } from '../Text/Text.type'

import { CardCoverImageProps } from './CardCoverImage/CardCoverImage.type'

import { BoxProps,VariantProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

export type CardVariants = VariantProps<Theme, 'cardVariants'>

export type CardProps = BoxProps<Theme> &
  CardVariants & {
    title?: string
    subTitle?: string
    titleProps?: TextProps
    subTitleProps?: TextProps
    coverImage?: ImageSourcePropType | string
    coverImageSize?: CardCoverImageProps['size']
    shouldFillCoverImage?: boolean
    coverImageProps?: CardCoverImageProps
    onPress?: () => void
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
  }
