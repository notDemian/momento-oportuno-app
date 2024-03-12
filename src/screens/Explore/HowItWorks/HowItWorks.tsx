import { FC } from 'react'

import { Box, Section, Text } from '@src/components'

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
      </Box>
      {/* <Box marginVertical={'m'} paddingHorizontal={'m'}>
        <YTFrame
          height={200}
          play={false}
          videoId='e6vTGtWBrdY'
          initialPlayerParams={{
            //si=s-XoBKcSPWDG5Wys&controls=0
            controls: false,
            modestbranding: true,
            rel: false,
          }}
          webViewProps={{
            allowsFullscreenVideo: true,
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
          }}
        />
      </Box> */}
    </Section>
  )
}

export default HowItWorks
