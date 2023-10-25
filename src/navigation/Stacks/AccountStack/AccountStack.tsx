import React, { useCallback } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button } from '@src/components'
import {
  AccountScreenProps,
  AccountStackParamList,
} from '@src/navigation/types'
import {
  Account,
  Checkout,
  EditProfile,
  NewAnuncioForm,
  NewAnuncioFormByCat,
  Packages,
  PaymentMethod,
  Promotion,
  SelectLocation,
  Settings,
  SupportCenter,
} from '@src/screens'
import { useAppTheme } from '@src/theme'

const Stack = createNativeStackNavigator<AccountStackParamList>()

export const AccountStack: React.FC<AccountScreenProps> = (props) => {
  const { colors } = useAppTheme()

  const headerRight = useCallback(() => {
    return (
      <Button
        label='+'
        onPress={() => {
          props.navigation.navigate('NewAnuncioForm')
        }}
      />
    )
  }, [])

  return (
    <Stack.Navigator
      initialRouteName='Account'
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        options={() => {
          return {
            title: 'Cuenta',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            // headerShown: false,
            headerRight,
          }
        }}
        name='Account'
        component={Account}
      />
      <Stack.Screen
        options={() => {
          return {
            headerTintColor: colors.white,
            headerShown: false,
          }
        }}
        name='Package'
        component={Packages}
      />

      <Stack.Screen
        name='PaymentMethod'
        options={{
          headerTitle: 'Método de pago',
        }}
        component={PaymentMethod}
      />
      <Stack.Screen
        name='MisAnuncios'
        options={{
          headerTitle: 'Anuncios',
        }}
        component={PaymentMethod}
      />
      <Stack.Screen
        name='Promotion'
        options={{
          headerTitle: 'Agregar un cupón',
        }}
        component={Promotion}
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
      <Stack.Screen
        name='Checkout'
        options={{
          headerTitle: 'Pago',
        }}
        component={Checkout}
      />

      <Stack.Screen
        options={(params) => {
          return {
            title: 'Agregar listado',
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
