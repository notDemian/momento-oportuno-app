import React from 'react'
import { Box, Text } from '@src/components/elements'
import { HeadingInformationProps } from './HeadingInformation.type'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const { title, listivo_130, listivo_2863 } = data
  return (
    <Box backgroundColor='card' padding='m'>
      <Box flexDirection='row' justifyContent='space-between'>
        <Box width='65%' paddingRight='s'>
          <Text variant='subHeader' numberOfLines={2}>
            {title.rendered}
          </Text>
        </Box>
        <Text variant='subHeader' color='primary'>
          {listivo_130[0]}
        </Text>
      </Box>
      <Text marginTop='m'>{listivo_2863[0]}</Text>
    </Box>
  )
}
