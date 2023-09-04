import React from 'react'
import { Alert, AlertButton } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@src/components'
import {
  NotificationScreenProps,
  NotificationStackParamList,
} from '@src/navigation/types'
import Favoritos from '@src/screens/Account/AccountViews/Favoritos'

const Stack = createNativeStackNavigator<NotificationStackParamList>()

export const NotificationStack: React.FC<NotificationScreenProps> = () => {
  const alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'OK' },
  ]

  const renderAddAddressHeaderRight = () => {
    return (
      <Icon
        name='heart'
        isPrimary
        onPress={() =>
          Alert.alert(
            'Delete all',
            'Once you delete all messages, you cannot undo it',
            alertButtons,
          )
        }
      />
    )
  }

  return (
    <Stack.Navigator initialRouteName='Notification'>
      <Stack.Screen
        options={() => {
          return {
            title: 'Favoritos',
            headerRight: renderAddAddressHeaderRight,
          }
        }}
        name='Notification'
        component={Favoritos}
      />
    </Stack.Navigator>
  )
}
