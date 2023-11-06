import { FC, useCallback, useMemo } from 'react'

import { PackageItemProps } from './PackageItem.type'

import { Addons } from '@src/api'
import { Box, Button, Text } from '@src/components'
import { SvgCheck } from '@src/components/svgs'
import { useAccountStackNavigation, useAppSelector } from '@src/hooks'
import { fontSize, getShadowBoxProps, useAppTheme } from '@src/theme'
import { formatCurrency } from '@src/utils'
export const PackageItem: FC<PackageItemProps> = ({ paquete, id, type }) => {
  const _theme = useAppTheme()

  const innerBackground = paquete.is_featured ? 'primary' : 'grayLight'
  const innerColor = paquete.is_featured ? 'white' : 'black'
  const borderColor = paquete.is_featured ? 'primary' : 'grayLight'

  const addons = useAppSelector((s) => s.cart.addons) ?? []

  const jointAddons = useMemo(() => {
    const tmpArr: Addons[] = []
    addons.forEach((addon) => {
      const found = paquete.addons?.find((a) => a.id === addon.id)
      if (found) {
        tmpArr.push(found)
      }
    })

    // sort putting if name includes 'Imá' first
    return tmpArr.sort((a, b) => {
      if (a.name.includes('Imá') && !b.name.includes('Imá')) {
        return -1
      } else if (!a.name.includes('Imá') && b.name.includes('Imá')) {
        return 1
      } else {
        return 0
      }
    })
  }, [addons])

  const nav = useAccountStackNavigation()

  const characteristics = useMemo(() => {
    const tmpArray: string[] = []

    if (paquete.expire && paquete.expire > 0) {
      tmpArray.push(`Duración: ${paquete.expire} días`)
    }

    if (paquete.expire && paquete.expire > 0) {
      tmpArray.push(`Destacado: ${paquete.expire} días`)
    }

    if (paquete.includes_video) {
      tmpArray.push('Puedes incluir video')
    }

    return tmpArray
  }, [paquete])

  const onPackagePressed = useCallback(() => {
    const { created_at: _, updated_at: __, ...noDates } = paquete

    nav.navigate('Checkout', { package: noDates, id, type })
  }, [paquete, id, type])

  return (
    <Box
      margin='m'
      minHeight={400}
      {...getShadowBoxProps()}
      borderColor={borderColor}
      borderWidth={1}
      borderTopWidth={0}
    >
      <Box
        backgroundColor={innerBackground}
        minHeight={50}
        justifyContent='center'
        alignItems='center'
        borderTopLeftRadius='l'
        borderTopRightRadius='l'
      >
        <Text
          variant='header'
          color={innerColor}
          textAlign={'center'}
          marginTop={'m'}
        >
          {paquete.name}
        </Text>
        {paquete.label ? (
          <Box
            backgroundColor={'white'}
            margin={'m'}
            marginTop={'s'}
            padding={'s'}
            borderRadius={'l'}
          >
            <Text
              fontSize={fontSize.s}
              color={'black'}
              textAlign={'center'}
              fontWeight={'bold'}
            >
              {paquete.label}
            </Text>
          </Box>
        ) : null}
      </Box>
      {/**Main body */}
      <Box
        flex={1}
        justifyContent='space-around'
        padding='m'
        backgroundColor='transparent'
        g={'l'}
      >
        <Text variant='header' color='black' textAlign={'center'}>
          {formatCurrency(paquete.price)} MXN
        </Text>
        <Box>
          <Button
            label='Elige este paquete'
            borderRadius={'m'}
            onPress={onPackagePressed}
          />
        </Box>
        {paquete.name ? (
          <Text variant={'subHeader'} fontSize={fontSize.m}>
            {paquete.name}
          </Text>
        ) : null}

        <Box marginTop={'m'} g='l'>
          {characteristics.map((item, index) => (
            <Box key={index} flexDirection={'row'} g='s'>
              <Box
                width={20}
                height={20}
                borderRadius={'l'}
                backgroundColor={'grayLight'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <SvgCheck
                  style={{
                    marginTop: 5,
                  }}
                />
              </Box>
              <Text color={'black'}>{item}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      {paquete.addons && paquete.addons.length > 0 ? (
        <Box
          m='m'
          padding='m'
          borderBottomLeftRadius='l'
          borderBottomRightRadius='l'
          {...getShadowBoxProps({ borderRadius: 's' })}
          backgroundColor={'creamy'}
          gap={'s'}
        >
          {jointAddons.map((addon) => {
            return (
              <Box
                key={addon.id}
                flexDirection={'row'}
                g='xs'
                justifyContent={'space-between'}
              >
                <Text color={'black'}>{addon.name}</Text>
                {addon.price != null ? (
                  addon.price !== 0 ? (
                    <Box
                      borderRadius={'m'}
                      backgroundColor={'white'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      p={'xs'}
                    >
                      <Text
                        color={'black'}
                        fontWeight={'bold'}
                        fontSize={fontSize.m}
                      >
                        $ {addon.price} MXN
                      </Text>
                    </Box>
                  ) : (
                    <Text color={'black'}>Gratis</Text>
                  )
                ) : null}
              </Box>
            )
          })}
        </Box>
      ) : null}
    </Box>
  )
}
