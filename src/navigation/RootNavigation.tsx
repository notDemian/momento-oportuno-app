import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { AuthenticationStack } from './Stacks'
import TabNavigation from './TabNavigation'
import { RootStackParamList } from './types'

import 'react-native-gesture-handler'
import { PortalHost } from '@gorhom/portal'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginModalPortal } from '@src/components'
import { useAppSelector } from '@src/hooks'
import {
  darkTheme,
  getNavigationTheme,
  theme as defaultTheme,
  ThemeContext,
} from '@src/theme'
import { T } from '@src/utils'
import * as Updates from 'expo-updates'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigation = () => {
  const { theme } = useContext(ThemeContext)
  const userToken = useAppSelector((s) => s.auth.user)

  const navigationTheme = React.useMemo(() => {
    return getNavigationTheme(theme)
  }, [theme])

  const eventListener = React.useCallback((event: Updates.UpdateEvent) => {
    event.message && console.log(event.message)
    if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE) return

    const message =
      'Hay una actualización disponible, cierra y vuelve a abrir la aplicación.'
    T.info(message, {
      // visibilityTime: 5000,
      autoHide: false,
      async onHide() {
        await Updates.reloadAsync()
      },
    })
  }, [])

  Updates.useUpdateEvents(eventListener)

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
        <LoginModalPortal>
          <RootStack.Navigator
            screenOptions={{
              presentation: 'modal',
            }}
            initialRouteName={userToken ? 'MainStacks' : 'AuthenticationStacks'}
          >
            <RootStack.Screen
              name='MainStacks'
              options={{ headerShown: false }}
              component={TabNavigation}
            />
            {userToken ? null : (
              <RootStack.Screen
                options={{
                  headerShown: false,
                }}
                name='AuthenticationStacks'
                component={AuthenticationStack}
              />
            )}
          </RootStack.Navigator>
        </LoginModalPortal>
      </NavigationContainer>
      <PortalHost name='rootPortal' />
    </>
  )
}
