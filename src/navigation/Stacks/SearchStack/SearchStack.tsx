import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type {
  SearchScreenProps,
  SearchStackParamList,
} from '@src/navigation/types'
import { SearchDishes, Filter } from '@src/screens'
import { Button, Icon, Text } from '@src/components'

const Stack = createNativeStackNavigator<SearchStackParamList>()

export const SearchStack: React.FC<SearchScreenProps> = () => {
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen
        options={() => {
          return {
            headerShown: false,
          }
        }}
        name='Search'
        component={SearchDishes}
      />
      <Stack.Screen
        options={({ navigation }) => {
          return {
            title: 'Filtra tu búsqueda',
            headerRight: (props) => {
              return (
                <Button
                  variant='transparent'
                  buttonSize='xs'
                  {...props}
                  onPress={() => {
                    navigation.goBack()
                  }}
                >
                  <Text>Borrar filtro</Text>
                </Button>
              )
            },
          }
        }}
        name='Filter'
        component={Filter}
      />
    </Stack.Navigator>
  )
}
