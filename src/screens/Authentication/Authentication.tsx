import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Images } from '@src/assets'
import { Box, Button, Image, Text } from '@src/components'
import {
  AuthStackParamList,
  ScreenProps,
  useGlobalNavigation,
} from '@src/navigation/types'
import { fontSize } from '@src/theme'

export const Authentication: React.FC<
  ScreenProps<AuthStackParamList, 'Authentication'>
> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets()

  const onJoinUs = () => {
    navigation.navigate('Login')
  }
  const onSocialNetworkConnectButtonPress = () => {
    navigation.navigate('Login')
  }

  const nav = useGlobalNavigation()

  const onOmitLogin = useCallback(() => {
    nav.replace('MainStacks', {
      screen: 'ExploreTab',
      params: { screen: 'Explore' },
    })
  }, [])

  return (
    <Box flex={1} flexDirection='column' backgroundColor='white'>
      <Box
        alignItems={'flex-end'}
        padding='m'
        zIndex={1}
        justifyContent={'center'}
      >
        <Button
          label='Omitir'
          onPress={onOmitLogin}
          variant={'outlineSecondary'}
        />
      </Box>
      <Image
        source={Images.authImage}
        position={'absolute'}
        width={Dimensions.get('window').width}
        height={'100%'}
        contentFit='contain'
      />
      <Box
        // height={340}
        position={'absolute'}
        width={'100%'}
        bottom={0}
        zIndex={1}
        padding='l'
        marginBottom={'xxl'}
        borderTopLeftRadius='xxl'
        borderTopRightRadius='xxl'
        backgroundColor='card'
        style={{
          paddingBottom: bottom !== 0 ? bottom : undefined,
        }}
      >
        <Text fontWeight='bold' variant='secondary' fontSize={fontSize.l}>
          ¿Buscas una manera fácil de vender tus cosas?
        </Text>
        <Text marginTop='xs' fontSize={fontSize.m}>
          El momento oportuno es la solución perfecta. Publica tus anuncios y
          llegaremos a miles de potenciales compradores. ¡Empieza a vender hoy
          mismo!
        </Text>
        <Box flex={1} marginTop='l'>
          <Button label='Únetenos' isFullWidth onPress={onJoinUs} />
          {/* <Button
            label='Conéctate con Facebook'
            isFullWidth
            variant='facebook'
            marginTop='s'
            backgroundColor='facebook'
            onPress={onSocialNetworkConnectButtonPress}
          />
          <Button
            label='Conéctate con Google'
            variant='google'
            marginTop='s'
            isFullWidth
            onPress={onSocialNetworkConnectButtonPress}
          /> */}
        </Box>
      </Box>
    </Box>
  )
}
