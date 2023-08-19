import { LayoutProps } from '@shopify/restyle'
import { Theme, extractSpacingProps, palette } from '@src/theme'
import { Text } from '../Text'
import { ButtonProps } from './Button.type'
import { getTextColor, getTextFontSize } from './Button.util'
import { ButtonContainer } from './ButtonContainer'
import { Touchable } from '../Touchable'
import { Box } from '../Box'
import { ActivityIndicator } from '../ActivityIndicator'

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  isFullWidth,
  textAlign = 'center',
  variant,
  buttonSize,
  children,
  isDisabled = false,
  borderRadius = 'l',
  ...rest
}) => {
  const alignSelf: LayoutProps<Theme>['alignSelf'] = isFullWidth
    ? 'auto'
    : 'flex-start'
  const textColor = getTextColor(variant)
  const fontSize = getTextFontSize(buttonSize)
  const { spacingProps, rest: otherProps } = extractSpacingProps(rest)

  const renderContent = () => {
    if (children) {
      return children
    }
    return (
      <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
        {!isDisabled ? (
          label
        ) : (
          <ActivityIndicator color={palette.blanquecino} />
        )}
      </Text>
    )
  }

  return (
    <Box
      borderRadius={borderRadius}
      overflow='hidden'
      width={isFullWidth ? '100%' : undefined}
      {...spacingProps}
    >
      <Touchable
        variant={variant}
        alignSelf={alignSelf}
        onPress={onPress}
        activeOpacity={0.7}
        borderRadius={borderRadius}
        disabled={isDisabled}
        {...otherProps}
      >
        <ButtonContainer
          variant={variant}
          buttonSize={buttonSize}
          borderRadius={borderRadius}
        >
          {renderContent()}
        </ButtonContainer>
      </Touchable>
    </Box>
  )
}
