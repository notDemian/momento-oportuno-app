import { createRestyleComponent, createVariant } from '@shopify/restyle';
import { Theme } from '@src/theme';
import { CardProps, CardVariants } from './Card.type';
import { Box } from '../Box';
import { CardContent } from './CardContent';
import { Touchable } from '../Touchable';
import { isIos } from '@src/utils';

const InnerCard = createRestyleComponent<
  CardVariants & React.ComponentProps<typeof Box> & CardProps,
  Theme
>([createVariant({ themeKey: 'cardVariants' })], Box);

export const Card: React.FC<CardProps> = ({
  title,
  subTitle,
  titleProps,
  subTitleProps,
  coverImage,
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
        title={title}
        subTitle={subTitle}
        titleProps={titleProps}
        subTitleProps={subTitleProps}>
        {children}
      </CardContent>
    );
  };

  return (
    <InnerCard
      backgroundColor="card"
      borderRadius="m"
      variant={variant}
      overflow={isIos ? undefined : 'hidden'}
      shadowColor="black"
      {...rest}>
      {onPress ? (
        <Touchable
          activeOpacity={0.5}
          shadowColor="black"
          useForeground
          onPress={onPress}>
          <Box>{renderCardContent()}</Box>
        </Touchable>
      ) : (
        renderCardContent()
      )}
    </InnerCard>
  );
};
