import { type FC, useCallback } from 'react'

import { UserAd } from '@src/api'
import { Box, Button, Text, Touchable } from '@src/components'
import { getShadowBoxProps } from '@src/theme'
import { redirectToEmail, redirectToSMS } from '@src/utils'

type UserInfoProps = {
  user: UserAd
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const onSMS = useCallback(() => {
    if (!user.phone) return
    redirectToSMS({ phone: user.phone })
  }, [user.phone])

  return (
    <Box
      p={'m'}
      justifyContent={'space-between'}
      marginVertical={'m'}
      gap={'m'}
      {...getShadowBoxProps()}
    >
      <Box flexDirection={'row'} flex={1} gap={'xl'} alignItems={'center'}>
        <>
          {/* {user.avatar_urls[96] ? (
            <Image
              source={{ uri: user.avatar_urls[96] }}
              width={100}
              height={100}
              borderRadius={'xxxl'}
            />
          ) : (
            <Box width={100} height={100} />
          )} */}
          <Box flex={1} flexDirection={'column'}>
            <Text variant={'subHeader'}>{user.name}</Text>
            <Text color={'gray'}>Miembro desde hace 2 meses</Text>
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
        </>
      </Box>
      <Box
        flex={1}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'m'}
      >
        <Button borderRadius={'m'} buttonSize={'bigHeader'}>
          <Text color={'white'}>Chat</Text>
        </Button>
        {user.phone ? (
          <Button borderRadius={'m'} buttonSize={'bigHeader'} onPress={onSMS}>
            <Text color={'white'}>Mensaje</Text>
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}
