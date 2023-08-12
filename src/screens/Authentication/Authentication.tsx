import React from 'react'
import { AuthContext } from '@src/auth'
import { Box, Button, Image, Text } from '@src/components'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Images } from '@src/assets'
import { Dimensions } from 'react-native'
import { fontSize } from '@src/theme'

export const Authentication: React.FC<
  ScreenProps<AuthStackParamList, 'Authentication'>
> = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext)
  const { bottom } = useSafeAreaInsets()

  const onConnectWithPhoneNumberButtonPress = () => {
    navigation.navigate('AuthenticationWithPhone')
  }
  const onSocialNetworkConnectButtonPress = () => {
    signIn()
  }

  return (
    <Box flex={1} flexDirection='column' backgroundColor='primary'>
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
          Clic del sureste es la solución perfecta. Publica tus anuncios y
          llegaremos a miles de potenciales compradores. ¡Empieza a vender hoy
          mismo!
        </Text>
        <Box marginTop='l'>
          <Button
            label='Regístrate sin costo'
            isFullWidth
            onPress={onConnectWithPhoneNumberButtonPress}
          />
          <Button
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
          />
        </Box>
      </Box>
    </Box>
  )
}
