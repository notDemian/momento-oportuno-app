import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Icon } from '@src/components'
import {
  NewAnuncioScreenProps,
  NewAnuncioStackParamList,
} from '@src/navigation/types'
import { NewAnuncioForm, NewAnuncioFormByCat } from '@src/screens'
import { fontSize } from '@src/theme'

const Stack = createNativeStackNavigator<NewAnuncioStackParamList>()

export const NewAnuncioStack: React.FC<NewAnuncioScreenProps> = ({
  navigation,
}) => {
  const renderExtraData = () => {
    return (
      <Button
        variant='transparent'
        buttonSize='xs'
        onPress={
          () => {}
          // navigation.navigate('SearchTab', { screen: 'Search' })
        }
      >
        <Icon name='eye' size={fontSize.l} isPrimary />
      </Button>
    )
  }

  return (
    <Stack.Navigator initialRouteName='NewAnuncioForm'>
      <Stack.Screen
        options={(params) => {
          return {
            title: 'Agregar listado',
            headerRight: renderExtraData,
          }
        }}
        name='NewAnuncioForm'
        component={NewAnuncioForm}
      />
      <Stack.Screen
        options={(params) => {
          return {
            title: 'Categoría',
          }
        }}
        name='NewAnuncioFormByCat'
        component={NewAnuncioFormByCat}
      />
    </Stack.Navigator>
  )
}
