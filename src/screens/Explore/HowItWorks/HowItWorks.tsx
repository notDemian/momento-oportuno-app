import { FC } from 'react'
import { Linking } from 'react-native'

import { Box, Icon, Section, Text, Touchable } from '@src/components'
import { getShadowBoxProps } from '@src/theme'

const onYT = () => {
  Linking.openURL('https://www.youtube.com/watch?v=e6vTGtWBrdY')
}

const HowItWorks: FC = () => {
  return (
    <Section marginBottom={'xxl'}>
      <Box
        marginVertical={'m'}
        paddingHorizontal={'m'}
        marginHorizontal={'xxl'}
        backgroundColor={'gray'}
        borderRadius={'xl'}
        alignItems='center'
      >
        <Text textAlign='left' color='white'>
          ¿Cómo funciona?
        </Text>
      </Box>
      <Box marginHorizontal={'m'}>
        <Text variant={'subHeader'}>
          Publicar un anuncio es fácil. Selecciona la categoría adecuada y
          realiza tu publicación de manera rápida y sencilla.
        </Text>
        <Touchable onPress={onYT}>
          <Box
            marginVertical={'m'}
            paddingHorizontal={'m'}
            justifyContent={'center'}
            alignItems={'center'}
            g={'m'}
            flexDirection={'row'}
            {...getShadowBoxProps({
              elevation: 10,
            })}
          >
            <Icon type='AntDesign' name='youtube' size={30} color='red' />
            <Text variant={'subHeader'}>
              Mira el video para más información
            </Text>
          </Box>
        </Touchable>
      </Box>
    </Section>
  )
}

export default HowItWorks
