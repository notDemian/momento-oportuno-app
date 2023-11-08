import { ActivityIndicatorProps as RNActivityIndicatorProps } from 'react-native'

import { BoxProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

export type ActivityIndicatorProps = RNActivityIndicatorProps & BoxProps<Theme>
