import { type FC, type PropsWithChildren, useMemo } from 'react'
import { Share } from 'react-native'

import {
  ActivityIndicator,
  Box,
  Button,
  SvgHeartFavorite,
  SvgShare,
  SvgWarning,
  Text,
  Touchable,
} from '@src/components'
import { useAddFavorite, useMyFavorites, useRemoveFavorite } from '@src/hooks'
import { getShadowBoxProps, palette } from '@src/theme'
import { getShareUrl } from '@src/utils'

type BottomButtonsProps = {
  slug: string | null | undefined
  id: number
}

export const BottomButtons: FC<PropsWithChildren<BottomButtonsProps>> = ({
  slug,
  id,
}) => {
  const { data: favorites } = useMyFavorites()
  const { mutate: addFav, isLoading } = useAddFavorite()
  const { mutate: rmFav, isLoading: loadRm } = useRemoveFavorite()

  const isFavorite = favorites?.data?.find((fav) => fav.id === id)

  const funcs = useMemo(
    () => ({
      share: async () => {
        try {
          if (!slug) return
          const link = getShareUrl(slug)
          await Share.share({
            message: link,
            title: 'Compartir',
          })
        } catch (error) {
          console.log(error)
        }
      },
      favorite: async () => {
        if (isFavorite) {
          rmFav(id)
          return
        }
        addFav(id)
      },
      print: () => {},
      danger: () => {},
    }),
    [slug, id, isFavorite],
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
          <SvgShare />
        </Button>
        {/* <Button variant='outline' onPress={funcs.print} borderRadius={'xxxl'}>
          <SvgPrint />
        </Button> */}
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
