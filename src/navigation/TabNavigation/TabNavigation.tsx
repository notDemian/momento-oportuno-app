import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  AccountStack,
  ActivityHistoryStack,
  ExploreStack,
  NotificationStack,
} from '../Stacks'
import { Box, Button, Icon, IconProps } from '@src/components'
import { TabParamList } from '../types'
import { fontSize, useAppTheme } from '@src/theme'
import styles from './TabNavigation.style'
import { Documentation } from '@src/screens'
import { NoTab404 } from '@src/screens/404'
import { useExploreStackNavigation } from '@src/hooks'
import { SearchStack } from '../Stacks/SearchStack'

type TabBarIconProps = {
  focused: boolean
  color: string
  size: number
}
const Tab = createBottomTabNavigator<TabParamList>()
const { Navigator } = Tab

const renderTabBarIcon = (routeName: keyof TabParamList) => {
  return (props: TabBarIconProps) => {
    const { color } = props
    let iconName: IconProps['name'] = 'compass'
    switch (routeName) {
      case 'ExploreTab':
        iconName = 'compass'
        break
      case 'ActivityHistoryTab':
        iconName = 'timer'
        break
      case 'NotificationTab':
        iconName = 'notifications'
        break
      case 'AccountTab':
        iconName = 'person-circle'
        break
      case 'DocumentationTab':
        iconName = 'logo-react'
        break
      default:
        break
    }
    return <Icon name={iconName} size={fontSize.xl} color={color} />
  }
}

const TabNavigation = () => {
  const theme = useAppTheme()
  const nav = useExploreStackNavigation()
  return (
    <Navigator
      initialRouteName='ExploreTab'
      screenOptions={(props) => {
        const {
          route: { name: routeName },
        } = props
        return {
          headerShown: false,
          tabBarIcon: renderTabBarIcon(routeName),
          tabBarItemStyle: styles.tabItem,
          tabBarInactiveTintColor: theme.colors.gray,
          tabBarActiveTintColor: theme.colors.secondary,
        }
      }}
    >
      <Tab.Screen
        name='ExploreTab'
        component={ExploreStack}
        options={{
          title: 'Inicio',
        }}
      />
      <Tab.Screen
        name='SearchTab'
        component={SearchStack}
        options={{
          title: 'Publicaciones',
        }}
      />
      {/* <Tab.Screen /> */}
      <Tab.Screen
        name='NoTab404'
        component={NoTab404}
        options={{
          tabBarButton: (_props) => {
            return (
              <Button
                variant={'secondary'}
                flex={1}
                onPress={() => {
                  nav.navigate('AddAddress')
                }}
              >
                <Icon
                  name='add'
                  type='MaterialIcons'
                  size={fontSize.m}
                  color={theme.colors.white}
                />
              </Button>
            )
          },
        }}
      />
      <Tab.Screen
        name='NotificationTab'
        component={NotificationStack}
        options={{
          title: 'Whishlist',
        }}
      />
      <Tab.Screen
        name='AccountTab'
        component={AccountStack}
        options={{
          title: 'Cuenta',
        }}
      />
      {/* <Tab.Screen
        name='DocumentationTab'
        component={Documentation}
        options={{
          title: 'Storybook',
        }}
      /> */}
    </Navigator>
  )
}

export default TabNavigation
