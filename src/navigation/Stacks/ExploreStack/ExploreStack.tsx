import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Icon } from '@src/components'
import {
  ExploreScreenProps,
  ExploreStackParamList,
} from '@src/navigation/types'
import {
  AddAddress,
  ChangeAddress,
  Explore,
  SavedAddresses,
  SelectLocation,
  TrackOrder,
} from '@src/screens'
import { fontSize } from '@src/theme'

const Stack = createNativeStackNavigator<ExploreStackParamList>()

export const ExploreStack: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const renderPlaceDetailHeaderRight = () => {
    return (
      <Button
        variant='transparent'
        buttonSize='xs'
        onPress={() => navigation.navigate('SearchTab', { screen: 'Search' })}
      >
        <Icon name='search' size={fontSize.l} isPrimary />
      </Button>
    )
  }

  const renderAddressHeaderRight = () => {
    return (
      <Icon
        name='map'
        size={18}
        isPrimary
        onPress={() => navigation.navigate('SelectLocation')}
      />
    )
  }

  return (
    <Stack.Navigator initialRouteName='Explore'>
      <Stack.Screen
        options={() => {
          return {
            title: '',
            headerShown: false,
          }
        }}
        name='Explore'
        component={Explore}
      />

      <Stack.Screen
        name='ChangeAddress'
        options={{
          headerTitle: '588 Blanda Square - Virginia',
          headerRight: renderAddressHeaderRight,
        }}
        component={ChangeAddress}
      />
      <Stack.Screen
        name='SavedAddresses'
        options={{
          headerTitle: 'Saved Addresses',
        }}
        component={SavedAddresses}
      />
      <Stack.Screen
        name='AddAddress'
        options={{
          headerTitle: 'Add An Address',
          headerRight: renderAddressHeaderRight,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name='SelectLocation'
        options={{
          headerTitle: '588 Blanda Square - Virginia',
        }}
        component={SelectLocation}
      />
      <Stack.Screen
        name='TrackOrder'
        options={{
          headerTitle: 'Track your order',
        }}
        component={TrackOrder}
      />
    </Stack.Navigator>
  )
}
