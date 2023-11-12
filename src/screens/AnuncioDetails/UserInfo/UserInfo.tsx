import { type FC, useCallback, useMemo } from 'react'

import { UserAd } from '@src/api'
import { Box, Button, Text, Touchable, useLoginModal } from '@src/components'
import {
  useGetMyChats,
  useInitChat,
  useSearchStackNavigation,
} from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import { redirectToEmail, redirectToSMS, T } from '@src/utils'
import { toRelative } from '@src/utils/dates'

type UserInfoProps = {
  user: UserAd
  listingId: number
}

export const UserInfo: FC<UserInfoProps> = ({ user, listingId }) => {
  const { isLoggedIn } = useLoginModal()

  const { data: chats } = useGetMyChats({
    enabled: !!isLoggedIn,
  })

  const { mutateAsync: initChat, isLoading: loadingChat } =
    useInitChat(listingId)

  const hasChat = useMemo(() => {
    if (!chats) return null
    return chats.find((chat) => chat.listing_id === listingId)
  }, [chats, listingId])

  const onChat = useCallback(async () => {
    if (!isLoggedIn) return

    if (hasChat) {
      nav.push('MainStacks', {
        screen: 'AccountTab',
        params: {
          screen: 'Chat',
          params: {
            id: hasChat.id,
            title: user.name,
          },
          initial: false,
        },
      })
      return
    }

    const res = await initChat()

    T.info('Chat iniciado')

    nav.push('MainStacks', {
      screen: 'AccountTab',
      params: {
        screen: 'Chat',
        params: {
          id: res.chat_id,
          title: user.name,
        },
        initial: false,
      },
    })
  }, [isLoggedIn, hasChat, listingId, user.name])

  const onSMS = useCallback(() => {
    if (!user.phone) return
    redirectToSMS({ phone: user.phone })
  }, [user.phone])

  const nav = useSearchStackNavigation()

  return (
    <Box
      p={'m'}
      justifyContent={'space-between'}
      marginVertical={'m'}
      gap={'m'}
      {...getShadowBoxProps()}
    >
      <Box
        flexDirection={'row'}
        flex={1}
        gap={'xl'}
        alignItems={'center'}
        marginHorizontal={'xl'}
      >
        <Box flex={1} flexDirection={'column'}>
          <Text variant={'subHeader'}>{user.name}</Text>
          <Text color={'gray'}>
            Miembro desde {toRelative(user.created_at)}
          </Text>
          {user.email ? (
            <Touchable
              onPress={() => {
                redirectToEmail({ email: user.email })
              }}
            >
              <Text color={'primary'} textDecorationLine={'underline'}>
                {user.email}
              </Text>
            </Touchable>
          ) : null}
        </Box>
      </Box>
      <Box
        flex={1}
        flexDirection={'row'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={'m'}
      >
        {user.microsite ? (
          <Box flex={1} width={'50%'}>
            <Button
              borderRadius={'m'}
              onPress={() => {
                if (!user.microsite) return
                nav.jumpTo('MicrositiosTab', {
                  screen: 'MicrositioById',
                  params: {
                    id: user.microsite.id,
                  },
                  initial: false,
                })
              }}
              label='Ir a micrositio'
            />
          </Box>
        ) : null}
        {user.phone ? (
          <Box flex={1} width={'50%'}>
            <Button borderRadius={'m'} onPress={onSMS} label='SMS' />
          </Box>
        ) : null}
      </Box>
      {isLoggedIn ? (
        <Box
          flex={1}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            borderRadius={'m'}
            buttonSize={'bigHeader'}
            variant={'orangy'}
            isFullWidth
            onPress={onChat}
            isLoading={loadingChat}
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}
            label={hasChat ? 'Ir a chat' : 'Enviar mensaje'}
          />
        </Box>
      ) : null}
    </Box>
  )
}
