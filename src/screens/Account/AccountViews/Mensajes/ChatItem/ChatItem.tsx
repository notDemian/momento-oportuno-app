import { type FC, useCallback } from 'react'

import { Chat } from '@src/api'
import { Box, Icon, Image, Text, Touchable } from '@src/components'
import { useAccountStackNavigation } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import { getImageUrl } from '@src/utils'
import { formatSpanish } from '@src/utils/dates'

type ChatItemProps = {
  chat: Chat
}

export const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const nav = useAccountStackNavigation()

  const onClick = useCallback(() => {
    nav.push('Chat', {
      id: chat.id,
      title: chat.seller.name,
    })
  }, [chat])

  return (
    <Touchable onPress={onClick}>
      <Box
        p='m'
        m={'xs'}
        g={'s'}
        // height={height / 5}
        // maxHeight={height / 5}
        flexDirection='row'
        {...getShadowBoxProps({ elevation: 10 })}
      >
        <Image
          source={{
            uri: getImageUrl({
              str: chat.listing.thumbnail,
            }),
          }}
          width={120}
          height={120}
          borderRadius='m'
          contentFit='cover'
        />
        <Box flex={1} justifyContent={'space-around'}>
          <Box
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='flex-start'
          >
            <Text variant='header'>
              {chat.seller.name}
              {' • '}
              <Text variant='body2'>Anuncio: {chat.listing.title}</Text>
            </Text>
          </Box>
          <Box
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='flex-start'
          >
            <Text variant='body2'>
              {formatSpanish(chat.updated_at, {
                format: 'DD/MM/YYYY [a las] HH:mm',
              })}
            </Text>
          </Box>
        </Box>
        <Box
          alignItems='center'
          justifyContent='space-between'
          alignSelf={'center'}
        >
          <Icon name='right' type='AntDesign' alignSelf={'center'} />
        </Box>
      </Box>
    </Touchable>
  )
}
