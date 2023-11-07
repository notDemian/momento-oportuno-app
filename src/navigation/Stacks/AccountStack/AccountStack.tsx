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

  //FIXME: remove this
  // props.navigation.navigate('NewAnuncioForm')
  // props.navigation.navigate('NewAnuncioFormByCat', { id: 1 })
  // props.navigation.navigate('NewAnuncioFormMedia', { id: 22 })
  // props.navigation.navigate('Packages', { id: 22, type: 'listing' })
  // props.navigation.navigate('Checkout', {
  //   id: 22,
  //   type: 'listing',
  //   package: {
  //     id: 1,
  //     name: 'Paquete Anuncio Básico',
  //     label: 'Paquete Anuncio Básico',
  //     type: 'listing',
  //     description: 'Descripcion del paquete',
  //     expire: 7,
  //     price: 200,
  //     display_price: '$200',
  //     is_featured: 0,
  //     is_active: 1,
  //     is_multistate: 0,
  //     includes_video: 0,
  //     includes_printing: 0,
  //     max_number_of_characters: 0,
  //     number_of_images: 0,
  //   },
  // })

  // calle
  // numero
  // colonia
  // ciudad/municipio
  // codigo postal

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
                  // props.navigation.navigate('NewAnuncioForm')
                  //FIXME: delete this
                  // props.navigation.navigate('NewAnuncioFormMedia', { id: 22 })
                  props.navigation.navigate('Packages', {
                    id: 12,
                    type: 'directory',
                  })
                  // props.navigation.navigate('NewAnuncioFormMedia', { id: 59 })
                  // props.navigation.navigate('PaymentConfirmation', {
                  //   id: 25,
                  //   // showSuccess: true,
                  // })
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
