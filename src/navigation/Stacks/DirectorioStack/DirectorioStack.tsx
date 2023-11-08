import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddButtonComponent } from '@src/navigation/StacksComponents'
import {
  DirectorioScreenProps,
  DirectorioStackParamList,
} from '@src/navigation/types'
import {
  DirectorioList,
  NewDirectorioFormScreen,
  NewDirectorioMediaScreen,
} from '@src/screens'
import { palette } from '@src/theme'

const Stack = createNativeStackNavigator<DirectorioStackParamList>()

export const DirectorioStack: React.FC<DirectorioScreenProps> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator initialRouteName='Directorio'>
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
            headerRight: () => (
              <AddButtonComponent
                nav={() => {
                  navigation.navigate('NewDirectorioForm')
                }}
              />
            ),
          }
        }}
        name='Directorio'
        component={DirectorioList}
      />
      <Stack.Screen
        options={() => {
          return {
            headerTitle: 'Crear Directorio',
          }
        }}
        name='NewDirectorioForm'
        component={NewDirectorioFormScreen}
      />
      <Stack.Screen
        options={() => {
          return {
            headerTitle: 'Crear Directorio',
          }
        }}
        name='NewDirectorioMedia'
        component={NewDirectorioMediaScreen}
      />
    </Stack.Navigator>
  )
}
