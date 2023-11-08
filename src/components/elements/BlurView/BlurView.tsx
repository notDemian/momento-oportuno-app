import { BlurViewProps } from './BlurView.type'

import { createBox } from '@shopify/restyle'
import { Theme, useAppTheme } from '@src/theme'
import { BlurView as ExpoBlurView } from 'expo-blur'

const InnerBlurView = createBox<Theme, BlurViewProps>(ExpoBlurView)

export const BlurView: React.FC<BlurViewProps> = (props) => {
  const { colorScheme } = useAppTheme()
  return (
    <InnerBlurView
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      {...props}
    />
  )
}
