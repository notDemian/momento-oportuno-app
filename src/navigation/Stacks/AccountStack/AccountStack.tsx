import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddButtonComponent } from '@src/navigation/StacksComponents'
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
  NewAnuncioFormMediaScreen,
  Packages,
  PaymentConfirmationScreen,
  Promotion,
  SelectLocation,
  Settings,
  SupportCenter,
} from '@src/screens'
import { useAppTheme } from '@src/theme'

const Stack = createNativeStackNavigator<AccountStackParamList>()

export const AccountStack: React.FC<AccountScreenProps> = (props) => {
  const { colors } = useAppTheme()

  return (
    <Stack.Navigator initialRouteName='Account'>
      <Stack.Screen
        options={() => {
          return {
            title: 'Cuenta',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerRight: () => (
              <AddButtonComponent
                nav={() => {
                  props.navigation.navigate('NewAnuncioForm')
                }}
              />
            ),
          }
        }}
        name='Account'
        component={Account}
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
      <Stack.Screen
        options={(params) => {
          return {
            title: 'Complementos',
          }
        }}
        name='NewAnuncioFormMedia'
        component={NewAnuncioFormMediaScreen}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Selecciona un paquete',
          }
        }}
        name='Packages'
        component={Packages}
      />

      <Stack.Screen
        name='Checkout'
        options={{
          headerTitle: 'Pago',
        }}
        component={Checkout}
      />
      <Stack.Screen
        name='PaymentConfirmation'
        options={{
          headerTitle: 'Confirmación de tu pago',
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
        }}
        component={PaymentConfirmationScreen}
      />
    </Stack.Navigator>
  )
}
