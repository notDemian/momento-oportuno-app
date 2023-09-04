import React from 'react'
import { Image } from '../../Image'

import {
  CardCoverImageProps,
  CardCoverImageSizeVariants,
} from './CardCoverImage.type'

import { createRestyleComponent, createVariant } from '@shopify/restyle'
import { Theme } from '@src/theme'

const CoverImage = createRestyleComponent<
  CardCoverImageSizeVariants & React.ComponentProps<typeof Image>,
  Theme
>(
  [
    createVariant({
      themeKey: 'cardCoverImageSizeVariants',
      property: 'size',
    }),
  ],
  Image,
)

export const CardCoverImage: React.FC<CardCoverImageProps> = ({
  size,
  shouldFill = false,
  ...rest
}) => {
  const params = {
    ...rest,
    ...(shouldFill
      ? { width: '100%', height: '100%' }
      : {
        size,
      }),
  }
  return (
    <CoverImage
      width='100%'
      contentFit='cover'
      borderTopLeftRadius='m'
      borderTopRightRadius='m'
      {...params}
    />
  )
}
