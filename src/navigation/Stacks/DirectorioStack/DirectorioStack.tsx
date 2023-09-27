import React from 'react'

import { HeaderBackground } from '@react-navigation/elements'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text } from '@src/components'
import {
  DirectorioScreenProps,
  DirectorioStackParamList,
} from '@src/navigation/types'
import { DirectorioList } from '@src/screens'
import { palette } from '@src/theme'

const Stack = createNativeStackNavigator<DirectorioStackParamList>()

export const DirectorioStack: React.FC<DirectorioScreenProps> = () => {
  return (
    <Stack.Navigator initialRouteName='Directorio'>
      <Stack.Screen
        options={() => {
          return {
            headerRight() {
              return <Text>Hola</Text>
            },
            headerBackground: () => (
              <HeaderBackground
                style={{ backgroundColor: palette.rojoMomento }}
              />
            ),
            headerTintColor: palette.white,
            headerTitleStyle: {
              color: palette.white,
            },
          }
        }}
        name='Directorio'
        component={DirectorioList}
      />
    </Stack.Navigator>
  )
}
