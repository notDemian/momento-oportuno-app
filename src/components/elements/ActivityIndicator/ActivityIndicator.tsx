import { ActivityIndicator as RNActivityIndicator } from 'react-native'

import { ActivityIndicatorProps } from './ActivityIndicator.type'

import { createBox } from '@shopify/restyle'
import { Theme, useAppTheme } from '@src/theme'

const InnerActivityIndicator = createBox<Theme, ActivityIndicatorProps>(
  RNActivityIndicator,
)

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = (props) => {
  const { colors } = useAppTheme()
  return <InnerActivityIndicator color={colors.primary} {...props} />
}
