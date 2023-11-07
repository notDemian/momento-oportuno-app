import { TouchableNativeFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ButtonProps } from '../Button'

export type TouchableProps = React.ComponentPropsWithoutRef<
  typeof TouchableOpacity
> &
  React.ComponentPropsWithoutRef<typeof TouchableNativeFeedback> &
  Pick<ButtonProps, 'variant' | 'children'> & {
    withoutFeedback?: boolean
  }
