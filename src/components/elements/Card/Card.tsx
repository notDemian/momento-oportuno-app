import { createRestyleComponent, createVariant } from '@shopify/restyle'
import { Theme } from '@src/theme'
import { CardProps, CardVariants } from './Card.type'
import { Box } from '../Box'
import { CardContent } from './CardContent'
import { Touchable } from '../Touchable'
import { isIos } from '@src/utils'

const InnerCard = createRestyleComponent<
  CardVariants & React.ComponentProps<typeof Box> & CardProps,
  Theme
>([createVariant({ themeKey: 'cardVariants' })], Box)

export const Card: React.FC<CardProps> = ({
  title,
  subTitle,
  titleProps,
  subTitleProps,
  coverImage,
  shouldFillCoverImage,
  variant,
  onPress,
  coverImageProps,
  coverImageSize,
  children,
  ...rest
}) => {
  const renderCardContent = () => {
    return (
      <CardContent
        coverImageSource={coverImage}
        coverImageSize={coverImageSize}
        coverImageProps={coverImageProps}
        shouldFillCoverImage={shouldFillCoverImage}
        title={title}
        subTitle={subTitle}
        titleProps={titleProps}
        subTitleProps={subTitleProps}
        // shouldRenderBody={false}
      >
        {children}
      </CardContent>
    )
  }

  return onPress ? (
    <Touchable shadowColor='black' onPress={onPress} borderRadius='l'>
      <InnerCard
        backgroundColor='background'
        borderRadius='l'
        variant={variant}
        overflow={isIos ? undefined : 'hidden'}
        shadowColor='black'
        // height={'100%'}
        flex={1}
        marginBottom={'l'}
        {...rest}
      >
        {renderCardContent()}
      </InnerCard>
    </Touchable>
  ) : (
    <InnerCard
      backgroundColor='background'
      borderRadius='l'
      variant={variant}
      overflow={isIos ? undefined : 'hidden'}
      shadowColor='black'
      // height={'100%'}
      flex={1}
      marginBottom={'l'}
      {...rest}
    >
      {renderCardContent()}
    </InnerCard>
  )
}
