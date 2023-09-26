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
import { useFavorites, useToggleFavorite } from '@src/hooks'
import { getShadowBoxProps, palette } from '@src/theme'

type BottomButtonsProps = {
  link: string
  id: number
}

export const BottomButtons: FC<PropsWithChildren<BottomButtonsProps>> = ({
  link,
  id,
}) => {
  const { data: favorites } = useFavorites()
  const { mutate, isLoading } = useToggleFavorite(id)

  const isFavorite = favorites?.includes(id)

  console.log({ favorites, isFavorite, id })

  const funcs = useMemo(
    () => ({
      share: async () => {
        try {
          await Share.share({
            message: link,
            title: 'Compartir',
          })
        } catch (error) {
          console.log(error)
        }
      },
      favorite: () => {
        mutate()
      },
      print: () => {},
      danger: () => {},
    }),
    [link, id],
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
