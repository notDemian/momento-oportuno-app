import React from 'react'
import { I18nManager } from 'react-native'
import { Box } from '../Box'
import { Icon, IconProps } from '../Icon'
import { Text } from '../Text'
import { Touchable } from '../Touchable'

import { ListRowItemProps } from './ListRowItem.type'

export const ListRowItem: React.FC<ListRowItemProps> = ({
  id,
  note,
  title,
  subTitle,
  isCompact,
  leftElement,
  rightElement,
  footer,
  hasChevron,
  containerProps,
  leftContainerProps,
  rightContainerProps,
  onPress,
}) => {
  const chevronIconName: IconProps['name'] = I18nManager.isRTL
    ? 'chevron-back'
    : 'chevron-forward'

  const handleOnPress = () => {
    onPress?.({
      id,
      title,
      subTitle,
      leftElement,
      rightElement,
    })
  }

  const renderContent = () => {
    return (
      <Box backgroundColor="card">
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical={isCompact ? 's' : 'm'}
          {...containerProps}>
          {leftElement && (
            <Box marginRight="m" {...leftContainerProps}>
              {leftElement}
            </Box>
          )}
          <Box flex={11}>
            {note && (
              <Text variant="secondary" textAlign="left">
                {note}
              </Text>
            )}
            <Text fontWeight="bold" marginVertical="xs" textAlign="left">
              {title}
            </Text>
            {subTitle && (
              <Text textAlign="left" variant="secondary">
                {subTitle}
              </Text>
            )}
          </Box>
          {rightElement && (
            <Box flex={2} alignItems="flex-end" {...rightContainerProps}>
              {rightElement}
            </Box>
          )}
          {hasChevron && (
            <Box flex={2} alignItems="flex-end" {...rightContainerProps}>
              <Icon name={chevronIconName} />
            </Box>
          )}
        </Box>
        {footer && <Box>{footer}</Box>}
      </Box>
    )
  }

  if (!onPress) {
    return renderContent()
  }

  return <Touchable onPress={handleOnPress}>{renderContent()}</Touchable>
}
