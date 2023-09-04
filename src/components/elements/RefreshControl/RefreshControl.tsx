import type { FC } from 'react'
import { RefreshControl as RNRefreshControl } from 'react-native-gesture-handler'

import { RefreshControllerProps } from './RefreshControl.type'

import { useAppTheme } from '@src/theme'

export const RefreshControl: FC<RefreshControllerProps> = ({
  refreshing,
  onRefresh,
  ...rest
}) => {
  const { colors } = useAppTheme()

  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[colors.primary]}
      tintColor={colors.primary}
      {...rest}
    />
  )
}
