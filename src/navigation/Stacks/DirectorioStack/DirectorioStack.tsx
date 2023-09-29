import React, { useCallback } from 'react'

import { HeaderBackground } from '@react-navigation/elements'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon, Touchable } from '@src/components'
import {
  DirectorioScreenProps,
  DirectorioStackParamList,
} from '@src/navigation/types'
import { CreateDirectorioScreen, DirectorioList } from '@src/screens'
import { palette } from '@src/theme'

const Stack = createNativeStackNavigator<DirectorioStackParamList>()

export const DirectorioStack: React.FC<DirectorioScreenProps> = ({
  navigation,
}) => {
  const headerRight = useCallback(function headerRight() {
    return (
      <Touchable
        onPress={() => {
          console.log('asd')
          navigation.navigate('CreateDirectorio')
        }}
      >
        <Icon name='add' size={36} color={palette.white} />
      </Touchable>
    )
  }, [])
  return (
    <Stack.Navigator initialRouteName='Directorio'>
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
        name='Directorio'
        component={DirectorioList}
      />
      <Stack.Screen
        options={() => {
          return {}
        }}
        name='CreateDirectorio'
        component={CreateDirectorioScreen}
      />
    </Stack.Navigator>
  )
}
