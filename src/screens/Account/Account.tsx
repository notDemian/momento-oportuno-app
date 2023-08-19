import React from 'react'
import { Box, Divider, Button, ListRowItem } from '@src/components'
import { ScrollView, Alert, AlertButton } from 'react-native'
import { AccountProps } from './Account.type'
import { useAppDispatch } from '@src/hooks'
import { logOutAction } from '@src/redux'
import { useUser } from '@src/hooks/useUser'

export const Account: React.FC<AccountProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const [user, logOutFunction] = useUser()

  const alertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    { text: 'Confirmar', onPress: logOutFunction },
  ]

  const onLogoutButtonPress = () => {
    Alert.alert(
      'Confirmación',
      '¿Seguro que deseas cerrar sesión?',
      alertButtons,
    )
  }

  return (
    <ScrollView>
      <Box backgroundColor='card'>
        <ListRowItem
          title={user.user_display_name}
          subTitle='Editar perfil'
          onPress={() => navigation.navigate('EditProfile')}
          // leftElement={<Image source={avatar} width={60} height={60} />}
          hasChevron
        />
      </Box>
      <Box backgroundColor='card' marginTop='m'>
        <Divider />
        <ListRowItem
          title='Configuración'
          onPress={() => navigation.navigate('Settings')}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title='Soporte'
          onPress={() => navigation.navigate('SupportCenter')}
          hasChevron
        />
      </Box>
      <Box padding='m'>
        <Button
          label='Cerrar sesión'
          isFullWidth
          variant='transparent'
          onPress={onLogoutButtonPress}
        />
      </Box>
    </ScrollView>
  )
}
