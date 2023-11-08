import { LottieViewProps } from './LottieView.type'

import { createBox } from '@shopify/restyle'
import { Theme } from '@src/theme'
import RNLottie, { AnimatedLottieViewProps } from 'lottie-react-native'

const InnerLottie = createBox<Theme, AnimatedLottieViewProps>(RNLottie)

export const LottieView: React.FC<LottieViewProps> = (props) => {
  return <InnerLottie {...props} />
}
