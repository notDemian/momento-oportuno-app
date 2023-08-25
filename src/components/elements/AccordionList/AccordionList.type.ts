import { FlatListProps, ViewStyle } from 'react-native'

export interface AccordionListProps<T>
  extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data: T[]
  customTitle: (item: T) => JSX.Element
  customBody: (item: T) => JSX.Element
  customIcon?: () => JSX.Element
  containerItemStyle?: ViewStyle
  animationDuration?: number
  expandMultiple?: boolean
}
