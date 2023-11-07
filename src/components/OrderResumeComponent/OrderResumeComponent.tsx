import type { FC } from 'react'
import { Box, Text } from '../elements'

import { Addons, Package } from '@src/api'
import { getShadowBoxProps } from '@src/theme'
import { formatCurrency } from '@src/utils'

type OrderResumeComponentProps =
  | {
      paquete: Omit<Package, 'created_at' | 'updated_at'>
      addons: Addons[]
      totalAddons: number
    }
  | {
      addons: Addons[]
    }

export const OrderResumeComponent: FC<OrderResumeComponentProps> = (props) => {
  if ('paquete' in props) {
    const { paquete, addons, totalAddons } = props

    return (
      <Box
        paddingVertical='s'
        paddingHorizontal='m'
        backgroundColor='white'
        marginBottom='s'
        gap={'s'}
      >
        <Text fontWeight={'bold'}>
          Paquete: <Text fontWeight={'normal'}>{paquete.name}</Text>
        </Text>
        {addons.length > 0 ? (
          <Text fontWeight={'bold'}>Complementos seleccionados</Text>
        ) : null}
        {addons.map((addon) => {
          return (
            <Box
              key={addon.id}
              {...getShadowBoxProps({ borderRadius: 's' })}
              padding={'s'}
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
              backgroundColor='creamy'
              marginBottom='s'
            >
              <Text>{addon.name}</Text>
              <Text variant='primary'>$ {addon.price} MXN</Text>
            </Box>
          )
        })}
        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text variant={'subHeader'} color={'primary'}>
            Subtotal
          </Text>
          <Text>$ {paquete.price} MXN</Text>
        </Box>
        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text variant={'header'}>Total</Text>
          <Text fontWeight={'600'}>
            {formatCurrency(paquete.price + (totalAddons ?? 0))}
          </Text>
        </Box>
      </Box>
    )
  }

  const { addons } = props

  return (
    <Box
      paddingVertical='s'
      paddingHorizontal='m'
      backgroundColor='white'
      marginBottom='s'
      gap={'s'}
    >
      {addons.length > 0 ? (
        <Text fontWeight={'bold'}>Complementos en tu orden</Text>
      ) : null}
      {addons.map((addon) => {
        return (
          <Box
            key={addon.id}
            {...getShadowBoxProps({ borderRadius: 's' })}
            padding={'s'}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            backgroundColor='creamy'
            marginBottom='s'
          >
            <Text>{addon.name}</Text>
            <Text variant='primary'>
              {addon.price ? formatCurrency(addon.price) : 'Gratis'}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
