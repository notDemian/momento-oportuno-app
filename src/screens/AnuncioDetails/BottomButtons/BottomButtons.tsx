import { type FC, type PropsWithChildren, useMemo } from 'react'
import { Share } from 'react-native'

import {
  ActivityIndicator,
  Box,
  Button,
  Icon,
  SvgHeartFavorite,
  SvgWarning,
  Text,
  Touchable,
  useLoginModal,
} from '@src/components'
import {
  useAddFavorite,
  useAppSelector,
  useMyFavorites,
  useRemoveFavorite,
} from '@src/hooks'
import { getShadowBoxProps, palette } from '@src/theme'
import { CLOG, getShareUrl, redirectToEmail } from '@src/utils'

type BottomButtonsProps = {
  id: number
}

export const BottomButtons: FC<PropsWithChildren<BottomButtonsProps>> = ({
  id,
}) => {
  const userId = useAppSelector((s) => s.auth.user?.id)
  const { open } = useLoginModal()
  const { data: favorites } = useMyFavorites({
    enabled: !!userId,
  })
  const { mutate: addFav, isLoading } = useAddFavorite()
  const { mutate: rmFav, isLoading: loadRm } = useRemoveFavorite()

  const isFavorite = favorites?.data?.find((fav) => fav.id === id)

  const funcs = useMemo(
    () => ({
      share: async () => {
        try {
          if (!id) return
          const link = getShareUrl(id)
          await Share.share({
            message: link,
            title: 'Compartir',
          })
        } catch (error) {
          CLOG.error(error)
        }
      },
      favorite: async () => {
        if (!userId)
          return open({
            message: 'Para agregar a favoritos debes iniciar sesión',
          })
        if (isFavorite) {
          rmFav(id)
          return
        }
        addFav(id)
      },
      print: () => {},
      danger: () => {
        redirectToEmail({
          email: 'reportes@elmomentooportuno.mx',
          body: 'Reporte de abuso',
          subject: `Reporte de abuso en anuncio ${id}`,
        })
      },
    }),
    [id, isFavorite, userId],
  )

  return (
    <>
      <Box
        padding={'s'}
        width={'45%'}
        alignSelf={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
        marginVertical={'m'}
        {...getShadowBoxProps()}
        backgroundColor={'white'}
      >
        <Button
          variant={isFavorite ? 'primary' : 'outline'}
          onPress={funcs.favorite}
          borderRadius={'xxxl'}
          isDisabled={isLoading}
        >
          {isLoading ? (
            <>
              <ActivityIndicator />
            </>
          ) : (
            <SvgHeartFavorite
              fill={isFavorite ? palette.white : palette.rojoMomento}
            />
          )}
        </Button>
        <Button variant='outline' onPress={funcs.share} borderRadius={'xxxl'}>
          <Icon name='share' type='Entypo' />
        </Button>
      </Box>
      <Touchable
        variant={'transparent'}
        flex={1}
        flexDirection={'row'}
        justifyContent={'center'}
        gap={'s'}
        onPress={funcs.danger}
        marginBottom={'l'}
      >
        <SvgWarning />
        <Text color={'danger'}>Reportar abuso</Text>
      </Touchable>
    </>
  )
}
