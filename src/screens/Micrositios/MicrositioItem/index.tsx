import { FC } from 'react'
import { Dimensions } from 'react-native'

import { Microsite } from '@src/api'
import { Box, Button, Image, Text } from '@src/components'
import { useMicrositiosStackNavigation } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'

const { height } = Dimensions.get('window')

export const MicrositioItem: FC<{ data: Microsite }> = ({ data }) => {
  const { description: _, id, image, title } = data

  const nav = useMicrositiosStackNavigation()

  return (
    <Box
      {...getShadowBoxProps({ elevation: 10 })}
      marginTop={'l'}
      minHeight={height * 0.5}
    >
      <Image
        source={{
          uri: typeof image === 'string' ? image : 'https://placehold.co/120',
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
