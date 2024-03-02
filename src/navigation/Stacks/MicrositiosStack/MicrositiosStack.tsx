import React, { useCallback } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddButtonComponent } from '@src/navigation/StacksComponents'
import {
  MicrositiosScreenProps,
  MicrositiosStackParamList,
} from '@src/navigation/types'
import {
  MicrositioById,
  Micrositios,
  NewMicrositioFormScreen,
  NewMicrositioMediaScreen,
} from '@src/screens'
import { palette } from '@src/theme'

const Stack = createNativeStackNavigator<MicrositiosStackParamList>()

export const MicrositiosStack: React.FC<MicrositiosScreenProps> = ({
  navigation,
}) => {
  const nav = useCallback(() => {
    navigation.navigate('NewMicrositioForm')
  }, [])

  return (
    <Stack.Navigator initialRouteName='Micrositios'>
      <Stack.Screen
        options={() => {
          return {
            headerStyle: {
              backgroundColor: palette.rojoMomento,
            },
            headerTintColor: palette.white,
            headerTitleStyle: {
              color: palette.white,
            },
            headerRight: () => <AddButtonComponent nav={nav} />,
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
      <Stack.Screen
        options={() => {
          return {
            headerShown: true,
            title: 'Crear Micrositio',
          }
        }}
        name='NewMicrositioForm'
        component={NewMicrositioFormScreen}
      />
      <Stack.Screen
        options={() => {
          return {
            headerShown: true,
            title: 'Crear Micrositio',
          }
        }}
        name='NewMicrositioMedia'
        component={NewMicrositioMediaScreen}
      />
    </Stack.Navigator>
  )
}
