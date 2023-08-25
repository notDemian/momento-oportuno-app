import { StyleProp, ViewStyle } from 'react-native/types'
import { type TabBar } from 'react-native-tab-view'

export type Cenes = {
  [key: string]: React.ComponentType<any>
}

export type TabViewItem = {
  key: string
  title: string
  icon?: string
  content: React.ComponentType<any>
}

export type TabViewData = TabViewItem[]

export type TabViewProps = {
  tabData: TabViewData
  onTabIndexChange?: (index: number) => void
  isFullWidth?: boolean
  tabBarStyle?: StyleProp<ViewStyle>
  onTabPress?: Parameters<typeof TabBar>[0]['onTabPress']
}
