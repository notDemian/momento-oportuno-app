import { useCallback } from 'react'
import { Alert, AlertButton } from 'react-native'
import { Box, TabView, type TabViewData, Text } from '@src/components'
import { useUser } from '@src/hooks/useUser'
import MisAvisos from './MisAvisos'
import Favoritos from './Favoritos'
import Mensajes from './Mensajes'
import MisOrdenes from './MisOrdenes'
import Ajustes from './Ajustes'
import { useAccountStackNavigation } from '@src/hooks'

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
  { key: '5', title: 'Paquete actual', content: PlaceHolder },
  { key: '6', title: 'Selecciona un paquete', content: PlaceHolder },
  { key: '7', title: 'Cerrar sesión', content: NullComponent },
]

export const AccountTabs = () => {
  const [_, logOutFunction] = useUser()

  const alertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    { text: 'Confirmar', onPress: logOutFunction },
  ]

  const nav = useAccountStackNavigation()

  const onLogoutButtonPress = () => {
    Alert.alert(
      'Confirmación',
      '¿Seguro que deseas cerrar sesión?',
      alertButtons,
    )
  }
  const onTabPress = useCallback<
    NonNullable<Parameters<typeof TabView>[0]['onTabPress']>
  >((e) => {
    if (e.route.key === '7') {
      e.preventDefault()
      onLogoutButtonPress()
    } else if (e.route.key === '6') {
      e.preventDefault()
      // navigation.navigate('Packages')
      nav.navigate('Package')
    }
  }, [])

  return <TabView tabData={tabData} isFullWidth onTabPress={onTabPress} />
}
