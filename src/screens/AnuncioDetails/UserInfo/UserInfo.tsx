import { type FC, useCallback } from 'react'

import { getAnuncioRes } from '@src/api'
import {
  Box,
  Button,
  ContentLoader,
  Image,
  Text,
  Touchable,
} from '@src/components'
import { useUserById } from '@src/hooks/querys/users/useUserById'
import { getShadowBoxProps } from '@src/theme'
import { CLOG, redirectToSMS } from '@src/utils'

type UserInfoProps = {
  user: getAnuncioRes['user']
}

export const UserInfo: FC<UserInfoProps> = ({ user: userProp }) => {
  const { data: user, isLoading } = useUserById(userProp.id)
  CLOG({ user })

  const onSMS = useCallback(() => {
    if (!userProp.phone) return
    redirectToSMS({ phone: userProp.phone })
  }, [userProp.phone])

  return (
    <Box
      p={'m'}
      justifyContent={'space-between'}
      marginVertical={'m'}
      gap={'m'}
      {...getShadowBoxProps()}
    >
      <Box flexDirection={'row'} flex={1} gap={'xl'} alignItems={'center'}>
        {!user || isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {user.avatar_urls[96] ? (
              <Image
                source={{ uri: user.avatar_urls[96] }}
                width={100}
                height={100}
                borderRadius={'xxxl'}
              />
            ) : (
              <Box width={100} height={100} />
            )}
            <Box flex={1} flexDirection={'column'}>
              <Text variant={'subHeader'}>{user.name}</Text>
              <Text color={'gray'}>Miembro desde hace 2 meses</Text>
              {user.link ? (
                <Touchable
                  onPress={() => {
                    // TODO: NAVIGATE TO MICROSITIOS
                  }}
                >
                  <Text color={'primary'} textDecorationLine={'underline'}>
                    Ver todas sus publicaciones
                  </Text>
                </Touchable>
              ) : null}
            </Box>
          </>
        )}
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
        {userProp.phone ? (
          <Button borderRadius={'m'} buttonSize={'bigHeader'} onPress={onSMS}>
            <Text color={'white'}>Mensaje</Text>
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}
