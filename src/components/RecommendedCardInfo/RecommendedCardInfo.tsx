import React from 'react'
import { Box, Text } from '../elements'

import { fontSize } from '@src/theme'
import { MappedAnuncio } from '@src/utils'

type RecommendedCardInfoProps = {
  data: MappedAnuncio
}

export const RecommendedCardInfo: React.FC<RecommendedCardInfoProps> = ({
  data,
}) => {
  const { defaultPrice, pricesAsSalary } = data

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      {defaultPrice ? (
        <Box>
          <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
            {defaultPrice}
          </Text>
        </Box>
      ) : pricesAsSalary ? (
        <Box>
          <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
            {pricesAsSalary}
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}
