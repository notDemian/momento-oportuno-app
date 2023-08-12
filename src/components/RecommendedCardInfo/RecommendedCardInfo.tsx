import React from 'react'
import { Place, RemarkablePlace } from '@src/data'
import { fontSize } from '@src/theme'
import { Box, Icon, RatingView, Text } from '../elements'
import { formatCurrency } from '@src/utils'

type RecommendedCardInfoProps = {
  data: RemarkablePlace
  ratingStarBackgroundColor?: string
}

export const RecommendedCardInfo: React.FC<RecommendedCardInfoProps> = ({
  data,
  ratingStarBackgroundColor,
}) => {
  const { price, views, title } = data

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      <Box paddingBottom='s'>
        <Text color='primary' marginLeft='xs' fontSize={fontSize.xl}>
          {formatCurrency(price)}
        </Text>
      </Box>
      <Box flexDirection='row'>
        <Box
          flexDirection='row'
          borderWidth={1}
          borderColor='primary'
          alignItems='center'
          paddingHorizontal='s'
          paddingVertical='xxs'
          borderRadius='l'
          marginRight='s'
        >
          <Icon name='eye' size={fontSize.xs} isPrimary />
          <Text
            color='primary'
            marginLeft='xs'
            fontSize={fontSize.xs}
          >{`${views} vistas`}</Text>
        </Box>
      </Box>
    </Box>
  )
}
