import React from 'react'
import { Dimensions, I18nManager } from 'react-native'
import { mockMerchantCaimpaigns, MerchantCampaign } from '@src/data'
import { Box, Carousel, Image, Section, Text } from '@src/components'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'
import { useAppTheme } from '@src/theme'

type StepsData = {
  img: string
  title: string
}

const STEPS_DATA: Array<StepsData> = [
  {
    img: 'https://clic.empresarialti.com/wp-content/uploads/2023/07/serv_icon_1.png.webp',
    title: 'Busca un anuncio',
  },
  {
    img: 'https://clic.empresarialti.com/wp-content/uploads/2023/07/serv_icon_2.png.webp',
    title: 'Encuentra lo que necesites',
  },
  {
    img: 'http://clic.empresarialti.com/wp-content/uploads/2023/07/serv_icon_3.png.webp',
    title: 'Contacta al vendedor',
  },
  {
    img: 'http://clic.empresarialti.com/wp-content/uploads/2023/07/serv_icon_4.png.webp',
    title: '¡Compra y recibe!',
  },
]

export const StepsFor = () => {
  const { colors } = useAppTheme()
  const renderItem = (props: CarouselRenderItemInfo<StepsData>) => {
    const { img, title } = props.item
    return (
      <Box
        key={props.index}
        backgroundColor='card'
        borderRadius='xxl'
        alignItems='center'
        justifyContent={'center'}
        marginLeft='m'
        paddingRight='m'
        style={{
          backgroundColor: colors.transparent,
        }}
        flex={1}
      >
        <Box backgroundColor={'yellow'} p={'m'} borderRadius={'xxxl'}>
          <Image source={img} width={70} height={70} />
        </Box>
        <Box
          backgroundColor='transparent'
          paddingLeft='s'
          gap={'s'}
          marginTop={'m'}
        >
          <Text
            fontWeight='bold'
            color='secondary'
            textAlign={I18nManager.isRTL ? 'left' : 'auto'}
          >
            {title}
          </Text>
        </Box>
      </Box>
    )
  }

  return (
    <Section
      backgroundColor='card'
      paddingVertical='m'
      alignItems='center'
      title='Te ayudamos a encontrar lo que necesitas'
    >
      <Carousel
        numItemsPerSlide={3}
        width={Dimensions.get('window').width}
        data={STEPS_DATA}
        height={200}
        renderItem={renderItem}
      />
    </Section>
  )
}
