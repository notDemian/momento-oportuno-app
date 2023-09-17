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
  const { defaultPrices, pricesAsSalary } = data

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      {defaultPrices?.[0] ? (
        <Box>
          <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
            {defaultPrices[0]}
          </Text>
        </Box>
      ) : pricesAsSalary?.[0] ? (
        <Box>
          <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
            {pricesAsSalary[0]}
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}
