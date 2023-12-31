import React from 'react'
import {
  Animated,
  SectionList as RNSectionList,
  SectionListData,
  SectionListProps,
  StyleProp,
  ViewStyle,
  ViewToken,
} from 'react-native'
import { Box } from '../Box'

import { TabBar } from './TabBar'

export interface TabSectionListProps extends SectionListProps<any> {
  scrollToLocationOffset?: number
  tabBarStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>
  tabBarScrollViewStyle?: StyleProp<ViewStyle>
  renderTab: (section: SectionListData<any>) => React.ReactNode
  onViewableItemsChangedCallback?: (info: {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
  }) => void
}

interface IState {
  currentIndex: number
}

export class TabSectionList extends React.PureComponent<
  TabSectionListProps,
  IState
> {
  state: IState = {
    currentIndex: 0,
  }

  private blockUpdateIndex = false
  private sectionList: React.RefObject<RNSectionList<any>> = React.createRef()

  render() {
    const {
      sections,
      renderTab,
      tabBarStyle,
      tabBarScrollViewStyle,
      scrollToLocationOffset,
      onViewableItemsChangedCallback,
    } = this.props

    const prepareSections = sections.map((item, index) => ({ ...item, index }))

    return (
      <Box position='relative'>
        <Animated.SectionList
          {...this.props}
          sections={prepareSections}
          onViewableItemsChanged={(info: any) => {
            const { viewableItems } = info
            if (!this.blockUpdateIndex && viewableItems[0]) {
              if (onViewableItemsChangedCallback) {
                onViewableItemsChangedCallback(info)
              }
              const currentIndex = viewableItems[0].section.index
              if (this.state.currentIndex !== currentIndex) {
                this.setState({ currentIndex })
              }
            }
          }}
          viewabilityConfig={{
            minimumViewTime: 10,
            itemVisiblePercentThreshold: 10,
          }}
          ref={this.sectionList as React.RefObject<any>}
          onMomentumScrollEnd={() => (this.blockUpdateIndex = false)}
        />
        <TabBar
          sections={prepareSections}
          renderTab={renderTab}
          tabBarStyle={tabBarStyle}
          tabBarScrollViewStyle={tabBarScrollViewStyle}
          currentIndex={this.state.currentIndex}
          onPress={(index: number) => {
            this.setState({ currentIndex: index })
            this.blockUpdateIndex = true

            const sectionList = this.sectionList.current
            if (sectionList && sectionList.scrollToLocation) {
              sectionList.scrollToLocation({
                animated: true,
                itemIndex: 0,
                viewOffset: scrollToLocationOffset || 0,
                sectionIndex: index,
              })
            }
          }}
        />
      </Box>
    )
  }
}
