import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Text } from '../Text'
import { Touchable } from '../Touchable'

import { ButtonProps } from './Button.type'
import { getTextColor, getTextFontSize } from './Button.util'
import { ButtonContainer } from './ButtonContainer'

import { LayoutProps } from '@shopify/restyle'
import { extractSpacingProps, palette, Theme } from '@src/theme'

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
  leftIcon,
  isModal = false,
  modalColor = palette.white,
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
      if (typeof children === 'string') {
        if (isModal)
          return (
            <Box
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Icon
                name='keyboard-arrow-down'
                type='MaterialIcons'
                color={palette.white}
              />
              <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
                {children}
              </Text>
            </Box>
          )
        return (
          <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
            {children}
          </Text>
        )
      }

      return isModal ? (
        <Box
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Icon
            name='keyboard-arrow-down'
            type='MaterialIcons'
            color={modalColor}
          />
          {children}
        </Box>
      ) : (
        children
      )
    }
    return (
      <>
        {isModal ? (
          <Box marginRight={'s'} flexDirection={'row'}>
            <Icon
              name='keyboard-arrow-down'
              type='MaterialIcons'
              color={modalColor}
            />
            <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
              {!isDisabled ? (
                label
              ) : (
                <ActivityIndicator color={palette.blanquecino} />
              )}
            </Text>
          </Box>
        ) : (
          <>
            {leftIcon ? (
              <Box flexDirection={'row'} justifyContent={'center'}>
                <Box marginRight='s'>{leftIcon}</Box>
                <Text
                  color={textColor}
                  textAlign={textAlign}
                  fontSize={fontSize}
                >
                  {!isDisabled ? (
                    label
                  ) : (
                    <ActivityIndicator color={palette.blanquecino} />
                  )}
                </Text>
              </Box>
            ) : (
              <Text color={textColor} textAlign={textAlign} fontSize={fontSize}>
                {!isDisabled ? (
                  label
                ) : (
                  <ActivityIndicator color={palette.blanquecino} />
                )}
              </Text>
            )}
          </>
        )}
      </>
    )
  }

  return (
    <Box
      borderRadius={borderRadius}
      overflow='hidden'
      width={isFullWidth ? '100%' : undefined}
      opacity={isDisabled ? 0.75 : 1}
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
