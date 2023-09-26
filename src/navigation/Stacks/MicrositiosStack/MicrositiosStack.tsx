import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  MicrositiosScreenProps,
  MicrositiosStackParamList,
} from '@src/navigation/types'
import { MicrositioById, Micrositios } from '@src/screens'

const Stack = createNativeStackNavigator<MicrositiosStackParamList>()

export const MicrositiosStack: React.FC<MicrositiosScreenProps> = () => {
  return (
    <Stack.Navigator initialRouteName='Micrositios'>
      <Stack.Screen
        options={() => {
          return {
            headerShown: false,
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
