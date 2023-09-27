import React, { useCallback } from 'react'

import { HeaderBackground } from '@react-navigation/elements'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon, Touchable } from '@src/components'
import {
  MicrositiosScreenProps,
  MicrositiosStackParamList,
} from '@src/navigation/types'
import { MicrositioById, Micrositios } from '@src/screens'
import { palette } from '@src/theme'

const Stack = createNativeStackNavigator<MicrositiosStackParamList>()

export const MicrositiosStack: React.FC<MicrositiosScreenProps> = () => {
  const headerRight = useCallback(function headerRight() {
    return (
      <Touchable>
        <Icon name='search' size={24} color={palette.white} />
      </Touchable>
    )
  }, [])

  return (
    <Stack.Navigator initialRouteName='Micrositios'>
      <Stack.Screen
        options={() => {
          return {
            headerBackground: () => (
              <HeaderBackground
                style={{ backgroundColor: palette.rojoMomento }}
              />
            ),
            headerTintColor: palette.white,
            headerTitleStyle: {
              color: palette.white,
            },
            headerRight,
          }
        }}
        name='Micrositios'
        component={Micrositios}
      />
      <Stack.Screen
        options={() => {
          return {
            headerShown: false,
          }
        }}
        name='MicrositioById'
        component={MicrositioById}
      />
    </Stack.Navigator>
  )
}
