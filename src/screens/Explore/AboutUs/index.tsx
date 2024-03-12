import { FC } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { Images } from '@src/assets'
import { Box, Carousel, Image, Section, Text } from '@src/components'

type InfoTab = {
  bigHelper: string
  helper: string
  description: string
}

const InfoTabs: InfoTab[] = [
  {
    bigHelper: '100',
    helper: 'mil',
    description: 'Anuncios cargados diariamente',
  },
  {
    bigHelper: '20',
    helper: '+',
    description: 'Transacciones por hora',
  },
  {
    bigHelper: '50',
    helper: 'mil',
    description: 'Usuarios registrados',
  },
]

const renderCarouselItem = ({ item }: CarouselRenderItemInfo<InfoTab>) => {
  return (
    <Box
      flex={1}
      justifyContent='center'
      alignItems='center'
      marginHorizontal='m'
    >
      <Text
        variant='largeHeader'
        marginBottom='xl'
        textAlign='left'
        color='black'
      >
        {item.bigHelper}
        <Text variant='subHeader' color='black'>
          {item.helper}
        </Text>
      </Text>
      <Text
        variant='subHeader'
        textAlign='left'
        color='black'
        fontWeight={'normal'}
        marginBottom='m'
      >
        {item.description}
      </Text>
    </Box>
  )
}

const AboutUs: FC = () => {
  return (
    <Section title='Sobre nosotros' marginBottom={'m'} paddingHorizontal={'m'}>
      <Image source={Images.info} contentFit='contain' height={300} />
      <Box marginVertical={'m'}>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text
            variant='largeHeader'
            marginBottom='xl'
            textAlign='left'
            color='black'
          >
            ¿Buscas algo en tu región?
          </Text>
        </Box>
        <Box
          flex={1}
          justifyContent='center'
          alignItems='center'
          marginBottom='m'
        >
          <Text
            variant='subHeader'
            textAlign='left'
            color='black'
            fontWeight={'normal'}
            marginBottom='m'
          >
            El Momento Oportuno te brinda una plataforma confiable y fácil para
            publicar tus anuncios. Confía en nosotros para encontrar lo que
            necesitas o vender con éxito.
          </Text>
        </Box>
      </Box>
      <Box
        backgroundColor={'primary'}
        marginVertical={'m'}
        alignItems='center'
        justifyContent='center'
      >
        <Carousel
          data={InfoTabs}
          renderItem={renderCarouselItem}
          width={Dimensions.get('window').width}
          height={500}
        />
      </Box>
    </Section>
  )
}

export default AboutUs
