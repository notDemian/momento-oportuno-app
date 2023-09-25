import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  DirectorioScreenProps,
  DirectorioStackParamList,
} from '@src/navigation/types'
import { DirectorioList } from '@src/screens'

const Stack = createNativeStackNavigator<DirectorioStackParamList>()

export const DirectorioStack: React.FC<DirectorioScreenProps> = () => {
  return (
    <Stack.Navigator initialRouteName='Directorio'>
      <Stack.Screen
        options={() => {
          return {
            headerShown: false,
          }
        }}
        name='Directorio'
        component={DirectorioList}
      />
    </Stack.Navigator>
  )
}
