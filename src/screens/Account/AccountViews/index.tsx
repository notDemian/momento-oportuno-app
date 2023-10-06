import { useCallback } from 'react'
import { Alert } from 'react-native'
import { DirectoriosTab } from '../Directorios'

import Ajustes from './Ajustes'
import Favoritos from './Favoritos'
import Mensajes from './Mensajes'
import MisAvisos from './MisAvisos'
import MisOrdenes from './MisOrdenes'

import { Box, TabView, type TabViewData, Text } from '@src/components'
import { useAccountStackNavigation } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'

const PlaceHolder = () => {
  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      <Text variant='header'>PlaceHolder</Text>
    </Box>
  )
}

const NullComponent = () => null

const tabData: TabViewData = [
  { key: '0', title: 'Mis anuncios', content: MisAvisos },
  {
    key: '1',
    title: 'Favoritos',
    content: Favoritos,
  },
  {
    key: '2',
    title: 'Mensajes',
    content: Mensajes,
  },
  { key: '3', title: 'Mis ordenes', content: MisOrdenes },
  { key: '4', title: 'Ajustes', content: Ajustes },
  { key: '5', title: 'Directorios', content: DirectoriosTab },
  { key: '6', title: 'Selecciona un paquete', content: PlaceHolder },
  { key: '7', title: 'Cerrar sesión', content: NullComponent },
]

export const AccountTabs = () => {
  const [_, logOutFunction] = useUser()

  const nav = useAccountStackNavigation()

  const onLogoutButtonPress = () => {
    Alert.alert('Confirmación', '¿Seguro que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      { text: 'Confirmar', onPress: logOutFunction },
    ])
  }
  const onTabPress = useCallback<
    NonNullable<Parameters<typeof TabView>[0]['onTabPress']>
  >((e) => {
    if (e.route.key === '7') {
      e.preventDefault()
      onLogoutButtonPress()
    } else if (e.route.key === '6') {
      e.preventDefault()
      nav.navigate('Package')
    }
  }, [])

  return <TabView tabData={tabData} isFullWidth onTabPress={onTabPress} />
}
