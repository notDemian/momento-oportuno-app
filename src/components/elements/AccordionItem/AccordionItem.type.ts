import { ViewStyle } from 'react-native'

export interface AccordionItemProps {
  customTitle: () => JSX.Element
  customBody: () => JSX.Element
  customIcon?: () => JSX.Element
  containerStyle?: ViewStyle
  animationDuration?: number
  isOpen?: boolean
  onPress?: (isOpen: boolean) => void
}
