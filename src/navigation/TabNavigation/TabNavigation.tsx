import {
  AccountStack,
  ExploreStack,
  NewAnuncioStack,
  NotificationStack,
  SearchStack,
} from '../Stacks'
import { TabParamList } from '../types'

import styles from './TabNavigation.style'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, IconProps } from '@src/components'
import { fontSize, useAppTheme } from '@src/theme'

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
        iconName = 'home'
        break
      case 'SearchTab':
        iconName = 'search'
        break
      case 'NotificationTab':
        iconName = 'book'
        break
      case 'AccountTab':
        iconName = 'person-circle'
        break
      case 'DocumentationTab':
        iconName = 'logo-react'
        break

      case 'NewAnuncioTab':
        iconName = 'trail-sign'
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
          // tabBarActiveBackgroundColor
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
          title: 'Anuncios',
        }}
      />
      {/* <Tab.Screen /> */}
      <Tab.Screen
        name='NewAnuncioTab'
        component={NewAnuncioStack}
        options={{
          title: 'Micrositios',
        }}
        // options={({ navigation }) => {
        //   return {
        //     tabBarButton: (_props) => {
        //       return (
        //         <Button
        //           variant={'secondary'}
        //           flex={1}
        //           onPress={() => navigation.navigate('NewAnuncioTab')}
        //         >
        //           <Icon
        //             name='add'
        //             type='MaterialIcons'
        //             size={fontSize.m}
        //             color={theme.colors.white}
        //           />
        //         </Button>
        //       )
        //     },
        //   }
        // }}
      />

      <Tab.Screen
        name='NotificationTab'
        component={NotificationStack}
        options={{
          title: 'Directorio',
        }}
      />
      <Tab.Screen
        name='AccountTab'
        component={AccountStack}
        options={{
          title: 'Cuenta',
          headerShown: false,
        }}
      />
    </Navigator>
  )
}

export default TabNavigation
