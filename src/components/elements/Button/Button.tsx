import { LayoutProps } from '@shopify/restyle';
import { Theme, extractSpacingProps } from '@src/theme';
import { Text } from '../Text';
import { ButtonProps } from './Button.type';
import { getTextColor, getTextFontSize } from './Button.util';
import { ButtonContainer } from './ButtonContainer';
import { Touchable } from '../Touchable';
import { Box } from '../Box';

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  isFullWidth,
  textAlign = 'center',
  variant,
  buttonSize,
  children,
  borderRadius = 'l',
  ...rest
}) => {
  const alignSelf: LayoutProps<Theme>['alignSelf'] = isFullWidth
    ? 'auto'
    : 'flex-start';
  const textColor = getTextColor(variant);
  const fontSize = getTextFontSize(buttonSize);
  const { spacingProps, rest: otherProps } = extractSpacingProps(rest);

  const renderContent = () => {
    if (children) {
      return children;
    }
    return (
      <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
        {label}
      </Text>
    );
  };

  return (
    <Box
      borderRadius={borderRadius}
      overflow="hidden"
      width={isFullWidth ? '100%' : undefined}
      {...spacingProps}>
      <Touchable
        variant={variant}
        alignSelf={alignSelf}
        onPress={onPress}
        activeOpacity={0.7}
        borderRadius={borderRadius}
        {...otherProps}>
        <ButtonContainer
          variant={variant}
          buttonSize={buttonSize}
          borderRadius={borderRadius}>
          {renderContent()}
        </ButtonContainer>
      </Touchable>
    </Box>
  );
};
