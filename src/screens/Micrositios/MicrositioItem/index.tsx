import { FC } from 'react'
import { Dimensions } from 'react-native'

import { Microsite } from '@src/api'
import { Box, Button, Image, Text } from '@src/components'
import { useMicrositiosStackNavigation } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import { getImageUrl } from '@src/utils'

const { height } = Dimensions.get('window')

export const MicrositioItem: FC<{ data: Microsite }> = ({ data }) => {
  const { description: _, id, thumbnail, title, media } = data

  const nav = useMicrositiosStackNavigation()

  return (
    <Box
      {...getShadowBoxProps({ elevation: 10 })}
      marginTop={'l'}
      minHeight={height * 0.5}
    >
      <Image
        source={{
          uri: getImageUrl({ str: thumbnail, media: media?.[0] }),
        }}
        width={'100%'}
        height={280}
        contentFit='cover'
        borderRadius={'m'}
      />
      <Box
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        marginVertical={'l'}
        gap={'l'}
      >
        <Text variant={'header'}>{title}</Text>
        <Button
          label='Ir a micrositio'
          onPress={() => {
            nav.navigate('MicrositioById', { id })
          }}
        />
      </Box>
    </Box>
  )
}
