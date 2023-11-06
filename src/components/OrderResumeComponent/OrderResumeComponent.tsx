import type { FC } from 'react'
import { Box, Text } from '../elements'

import { Addons, Package } from '@src/api'
import { getShadowBoxProps } from '@src/theme'

type OrderResumeComponentProps = {
  paquete: Omit<Package, 'created_at' | 'updated_at'>
  addons: Addons[]
  totalAddons: number
}

export const OrderResumeComponent: FC<OrderResumeComponentProps> = ({
  paquete,
  addons,
  totalAddons,
}) => {
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
        {totalAddons > 0 ? (
          <Text>$ {paquete.price + totalAddons} MXN</Text>
        ) : (
          <Text>$ {paquete.price} MXN</Text>
        )}
      </Box>
    </Box>
  )
}
