import { CardProps } from '../Card.type'
import { CardCoverImageProps } from '../CardCoverImage/CardCoverImage.type'

export type CardContentProps = {
  coverImageSource?: CardCoverImageProps['source']
  coverImageSize?: CardCoverImageProps['size']
  coverImageProps?: CardCoverImageProps
  shouldFillCoverImage?: boolean
  shouldRenderBody?: boolean
  children?: React.ReactNode
} & Pick<CardProps, 'title' | 'titleProps' | 'subTitle' | 'subTitleProps'>
