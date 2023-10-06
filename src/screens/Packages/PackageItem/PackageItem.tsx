import { FC, useCallback, useMemo } from 'react'

import { PackageItemProps } from './PackageItem.type'

import { Box, Button, Text } from '@src/components'
import { SvgCheck } from '@src/components/svgs'
import { useAccountStackNavigation } from '@src/hooks'
import { fontSize, getShadowBoxProps, useAppTheme } from '@src/theme'
import { formatCurrency } from '@src/utils'
export const PackageItem: FC<PackageItemProps> = ({ paquete }) => {
  const _theme = useAppTheme()

  const innerBackground = paquete.isFeatured ? 'primary' : 'grayLight'
  const innerColor = paquete.isFeatured ? 'white' : 'black'
  const borderColor = paquete.isFeatured ? 'primary' : 'grayLight'

  const nav = useAccountStackNavigation()

  const characteristics = useMemo(() => {
    const tmpArray: string[] = []

    if (paquete.number && paquete.number > 1) {
      tmpArray.push(`Publicaciones: ${paquete.number}x`)
    }
    if (paquete.expire && paquete.expire > 0) {
      tmpArray.push(`Duración: ${paquete.expire} días`)
    }

    if (paquete.featuredExpire && paquete.featuredExpire > 0) {
      tmpArray.push(`Destacado: ${paquete.featuredExpire} días`)
    }

    if (paquete.bumpsNumber && paquete.bumpsNumber > 0) {
      tmpArray.push(`Impulsar publicación: ${paquete.bumpsNumber}x`)
    }

    if (paquete.bumpsInterval && paquete.bumpsInterval > 0) {
      tmpArray.push(
        `Puedes Impulsar publicaciones durante: ${paquete.bumpsInterval} días`,
      )
    }

    return tmpArray
  }, [paquete])

  const onPackagePressed = useCallback(() => {
    nav.navigate('Checkout', paquete)
  }, [paquete])

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
        <Text variant='header' color={innerColor}>
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
        {paquete.text ? (
          <Text variant={'subHeader'} fontSize={fontSize.m}>
            {paquete.text}
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
    </Box>
  )
}
