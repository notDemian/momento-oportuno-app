import { HeaderBackground } from '@react-navigation/elements'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@src/components'
import {
  AccountScreenProps,
  AccountStackParamList,
} from '@src/navigation/types'
import {
  Account,
  EditProfile,
  Packages,
  SelectLocation,
  Settings,
  SupportCenter,
} from '@src/screens'
import { useAppTheme } from '@src/theme'
import React from 'react'

const Stack = createNativeStackNavigator<AccountStackParamList>()

export const AccountStack: React.FC<AccountScreenProps> = (props) => {
  const { navigation } = props

  const { colors } = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName='Account'
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        options={() => {
          return {
            title: 'Cuenta',
            headerBackground: () => (
              <HeaderBackground style={{ backgroundColor: colors.primary }} />
            ),
            headerTintColor: colors.white,
            // headerShown: false,
          }
        }}
        name='Account'
        component={Account}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Cuenta',
            headerBackground: () => (
              <HeaderBackground style={{ backgroundColor: colors.primary }} />
            ),
            headerTintColor: colors.white,
            // headerShown: false,
          }
        }}
        name='Package'
        component={Packages}
      />

      <Stack.Screen
        options={() => {
          return {
            title: 'Editar perfil',
          }
        }}
        name='EditProfile'
        component={EditProfile}
      />
      <Stack.Screen
        name='Settings'
        options={{
          headerTitle: 'Configuración',
        }}
        component={Settings}
      />
      <Stack.Screen
        name='SupportCenter'
        options={{
          headerTitle: 'Soporte',
        }}
        component={SupportCenter}
      />
      <Stack.Screen
        name='SelectLocation'
        options={{
          headerTitle: 'Select location',
        }}
        component={SelectLocation}
      />
    </Stack.Navigator>
  )
}
