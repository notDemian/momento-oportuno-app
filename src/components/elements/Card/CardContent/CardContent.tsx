import { Box } from '../../Box'
import { Text } from '../../Text'
import { CardCoverImage } from '../CardCoverImage'
import { CardContentProps } from './CardContent.type'

export const CardContent: React.FC<CardContentProps> = ({
  children,
  coverImageProps,
  coverImageSize,
  shouldFillCoverImage = false,
  coverImageSource,
  subTitle,
  shouldRenderBody = true,
  title,
  subTitleProps,
  titleProps,
}) => {
  return (
    <>
      {coverImageSource ? (
        <CardCoverImage
          source={coverImageSource}
          size={coverImageSize}
          shouldFill={shouldFillCoverImage}
          {...coverImageProps}
        />
      ) : null}
      {shouldFillCoverImage && title ? (
        <Box position={'absolute'} bottom={10} left={10}>
          <Text fontWeight='bold' {...titleProps}>
            {title}
          </Text>
        </Box>
      ) : null}
      {shouldRenderBody ? (
        <Box padding='m'>
          <Box>
            {title ? (
              <Text fontWeight='bold' {...titleProps}>
                {title}
              </Text>
            ) : null}
            {subTitle ? (
              <Text variant='secondary' marginTop='s' {...subTitleProps}>
                {subTitle}
              </Text>
            ) : null}
          </Box>
          {children ? <Box marginTop='s'>{children}</Box> : null}
        </Box>
      ) : null}
    </>
  )
}
