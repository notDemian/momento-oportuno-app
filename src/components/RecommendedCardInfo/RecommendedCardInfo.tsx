import React, { useMemo } from 'react'
import { Box, Text } from '../elements'

import { Ad } from '@src/api'
import { fontSize } from '@src/theme'
import { Constants, getPriceOrSalary } from '@src/utils'

type RecommendedCardInfoProps = {
  data: Ad
}

const PRICE_ID = Constants.IDS.price
const SALARY_ID = Constants.IDS.salary

export const RecommendedCardInfo: React.FC<RecommendedCardInfoProps> = ({
  data,
}) => {
  const { attributes, category } = data

  const priceOrSalary = useMemo(
    () =>
      getPriceOrSalary({
        attributes,
        formatted: true,
      }),
    [attributes],
  )

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
      minHeight={1000}
      height={'auto'}
    >
      <Box
        backgroundColor={'secondary'}
        p={'xs'}
        borderRadius={'m'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text color='white' marginLeft='xs' fontSize={fontSize.m}>
          {category.name}
        </Text>
      </Box>
      {priceOrSalary ? (
        <Text color='naranjaClarito' marginLeft='xs' fontSize={fontSize.m}>
          {priceOrSalary}
        </Text>
      ) : null}
    </Box>
  )
}
