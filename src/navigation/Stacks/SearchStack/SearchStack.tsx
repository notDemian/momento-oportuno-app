import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Text } from '@src/components'
import { useAppDispatch } from '@src/hooks'
import type {
  SearchScreenProps,
  SearchStackParamList,
} from '@src/navigation/types'
import { resetFilter } from '@src/redux'
import { AnuncioDetails, Filter, SearchScreen } from '@src/screens'

const Stack = createNativeStackNavigator<SearchStackParamList>()

export const SearchStack: React.FC<SearchScreenProps> = () => {
  const dispatch = useAppDispatch()
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen
        options={() => {
          return {
            headerShown: false,
          }
        }}
        name='Search'
        component={SearchScreen}
        initialParams={{
          query: undefined,
          isSearching: false,
          category: undefined,
          state: undefined,
        }}
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
                    dispatch(resetFilter())
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
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: '',
          headerBackTitleVisible: false,
        }}
        name='AnuncioDetailsModal'
        component={AnuncioDetails}
      />
    </Stack.Navigator>
  )
}
