import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  theme as defaultTheme,
  darkTheme,
  ThemeContext,
  getNavigationTheme,
} from '@src/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import { AuthenticationStack } from './Stacks'
import { RootStackParamList } from './types'
import { PortalHost } from '@gorhom/portal'
import { useAppSelector } from '@src/hooks'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigation = () => {
  const { theme } = useContext(ThemeContext)
  const userToken = useAppSelector((s) => s.auth.user)

  const navigationTheme = React.useMemo(() => {
    return getNavigationTheme(theme)
  }, [theme])

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          backgroundColor={
            theme === 'light'
              ? defaultTheme.colors.background
              : darkTheme.colors.background
          }
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <RootStack.Navigator
          screenOptions={{
            presentation: 'modal',
          }}
        >
          {userToken ? (
            <RootStack.Screen
              name='MainStacks'
              options={{ headerShown: false }}
              component={TabNavigation}
            />
          ) : (
            <RootStack.Screen
              options={{
                headerShown: false,
              }}
              name='AuthenticationStacks'
              component={AuthenticationStack}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      <PortalHost name='rootPortal' />
    </>
  )
}
