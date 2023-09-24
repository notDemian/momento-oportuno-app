import type { FC } from 'react'

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
import { CLOG } from '@src/utils'

type UserInfoProps = {
  id: number
}

export const UserInfo: FC<UserInfoProps> = ({ id }) => {
  const { data: user, isLoading } = useUserById(id)

  CLOG(user)

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
                    CLOG(user.link)
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
        <Button borderRadius={'m'} buttonSize={'bigHeader'}>
          <Text color={'white'}>Email</Text>
        </Button>
      </Box>
    </Box>
  )
}
