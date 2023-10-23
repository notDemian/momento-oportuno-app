import React from 'react'
import { Box, Text } from '../elements'

import { Ad } from '@src/api'
import { fontSize } from '@src/theme'

type RecommendedCardInfoProps = {
  data: Ad
}

export const RecommendedCardInfo: React.FC<RecommendedCardInfoProps> = ({
  data,
}) => {
  const { attributes, category } = data

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
      minHeight={1000}
      height={'auto'}
    >
      <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
        {category.name}
      </Text>

      {attributes.slice(0, 2).map((attribute) => {
        const { name, value, id } = attribute

        return (
          <Box key={id}>
            <Text color='naranjaClarito' marginLeft='xs' fontSize={fontSize.m}>
              {name}
            </Text>

            {Array.isArray(value) ? (
              value.map((v) => (
                <Box key={v.id}>
                  <Text>{v.name}</Text>
                </Box>
              ))
            ) : (
              <Text>{value}</Text>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
