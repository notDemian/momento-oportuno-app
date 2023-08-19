import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  AccountStack,
  ExploreStack,
  NotificationStack,
  SearchStack,
  NewAnuncioStack,
} from '../Stacks'
import { Button, Icon, IconProps } from '@src/components'
import { TabParamList } from '../types'
import { fontSize, useAppTheme } from '@src/theme'
import styles from './TabNavigation.style'

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
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarHideOnKeyboard: true,
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
        name='NewAnuncioTab'
        component={NewAnuncioStack}
        options={({ navigation }) => {
          return {
            tabBarButton: (_props) => {
              return (
                <Button
                  variant={'secondary'}
                  flex={1}
                  onPress={() => navigation.navigate('NewAnuncioTab')}
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
          }
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
    </Navigator>
  )
}

export default TabNavigation
