import React, { useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { TabView as RNTabView, TabBar, SceneMap } from 'react-native-tab-view'
import { useStyles } from './TabView.style'
import { Cenes, TabViewProps } from './TabView.type'
import { Icon } from '../Icon'
import { useAppTheme } from '@src/theme'
const { height, width } = Dimensions.get('window')

export const TabView: React.FC<TabViewProps> = ({
  tabData,
  onTabIndexChange,
  isFullWidth,
  tabBarStyle,
  onTabPress,
}) => {
  const {
    colors: { card, yellow, primary, text },
  } = useAppTheme()
  const [navigationStateIndex, setNavigationStateIndex] = React.useState(0)
  const styles = useStyles()

  const renderIcon = useCallback<
    NonNullable<Parameters<typeof TabBar>[0]['renderIcon']>
  >((props) => {
    const { route } = props
    if (route.icon) {
      return <Icon name={route.icon} size={20} color='white' />
    }
    return null
  }, [])

  const onIndexChange = useCallback(
    (index: number) => {
      setNavigationStateIndex(index)
      if (onTabIndexChange) {
        onTabIndexChange(index)
      }
    },
    [onTabIndexChange],
  )

  const tabViewRoutes = useMemo(() => {
    return tabData.map((item) => {
      return {
        key: item.key,
        title: item.title,
        icon: item.icon,
      }
    })
  }, [tabData])

  const navigationState = useMemo(() => {
    return {
      index: navigationStateIndex,
      routes: tabViewRoutes,
    }
  }, [navigationStateIndex, tabViewRoutes])

  const scenes: Cenes = useMemo(() => {
    return tabData.reduce((acc, item) => {
      acc[item.key] = item.content
      return acc
    }, {} as Cenes)
  }, [tabData])

  return (
    <RNTabView
      navigationState={navigationState}
      swipeEnabled={false}
      renderTabBar={(props) => {
        return (
          <TabBar
            {...props}
            renderIcon={renderIcon}
            style={[{ backgroundColor: card }, tabBarStyle]}
            labelStyle={styles.tabBarLabel}
            activeColor={primary}
            inactiveColor={text}
            tabStyle={[
              styles.tabBar,
              {
                width: isFullWidth
                  ? width / (tabData.length <= 3 ? tabData.length : 3.45)
                  : width,
              },
            ]}
            indicatorStyle={{
              backgroundColor: yellow,
            }}
            scrollEnabled
            onTabPress={onTabPress}
          />
        )
      }}
      renderScene={SceneMap(scenes)}
      onIndexChange={onIndexChange}
      initialLayout={{ width, height }}
      style={{
        height,
      }}
    />
  )
}
