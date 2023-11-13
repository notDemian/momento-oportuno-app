import { type FC, useCallback, useMemo } from 'react'

import { Chat } from '@src/api'
import { Box, Icon, Image, Text, Touchable } from '@src/components'
import { useAccountStackNavigation } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
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

  const [{ id }] = useUser()

  const name = useMemo(() => {
    const other = chat.seller.id === id ? chat.buyer.name : chat.seller.name

    return other
  }, [chat, id])

  const msg = useMemo(() => {
    let lastMsg = chat.last_message.message

    const LIMIT = 20
    if (lastMsg.length > LIMIT) {
      lastMsg = lastMsg.slice(0, LIMIT) + '...'
    }

    const other = chat.last_message.user_id === id ? 'Yo' : name

    return `${other}: ${lastMsg}`
  }, [chat, id, name])

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
              media: chat.listing.media?.[0],
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
            <Text variant='subHeader'>
              {name}
              {' • '}
              <Text variant='body2'>Anuncio: {chat.listing.title}</Text>
            </Text>
          </Box>
          <Box
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='flex-start'
          >
            <Text color={'secondary'}>{msg}</Text>
          </Box>
          <Box
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='flex-start'
          >
            <Text color={'gray'}>
              {formatSpanish(chat.last_message.updated_at, {
                format: 'dddd DD [•] HH:mm',
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
