import React from 'react'
import { Place, RemarkablePlace } from '@src/data'
import { fontSize, useAppTheme } from '@src/theme'
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

  const { colors } = useAppTheme()

  return (
    <Box
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      <Box>
        <Text color='primary' marginLeft='xs' fontSize={fontSize.m}>
          {formatCurrency(price)}
        </Text>
      </Box>
      <Box flexDirection='row'>
        <Box
          flexDirection='row'
          borderWidth={1}
          borderColor='secondary'
          backgroundColor={'secondary'}
          alignItems='center'
          paddingHorizontal='s'
          paddingVertical='xxs'
          borderRadius='l'
          marginRight='s'
        >
          <Icon name='eye' size={fontSize.xs} color={colors.white} />
          <Text
            color='white'
            marginLeft='xs'
            fontSize={fontSize.xs}
          >{`${views} vistas`}</Text>
        </Box>
      </Box>
    </Box>
  )
}
