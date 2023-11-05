import { type FC, useCallback } from 'react'

import { UserAd } from '@src/api'
import { Box, Button, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import { redirectToEmail, redirectToSMS } from '@src/utils'
import { toRelative } from '@src/utils/dates'

type UserInfoProps = {
  user: UserAd
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
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
        justifyContent={'center'}
        alignItems={'center'}
        gap={'m'}
      >
        {user.microsite ? (
          <Button
            borderRadius={'m'}
            buttonSize={'bigHeader'}
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
          >
            <Text color={'white'}>Ir a micrositio</Text>
          </Button>
        ) : null}
        {user.phone ? (
          <Button borderRadius={'m'} buttonSize={'bigHeader'} onPress={onSMS}>
            <Text color={'white'}>Mensaje</Text>
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}
