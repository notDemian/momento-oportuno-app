import React, { useMemo } from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'
import { toRelative } from '@src/utils/dates'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const {
    title,
    defaultPrices,
    fullData: { listivo_2863 },
    Categories,
    date,
  } = data

  const relativeDate = useMemo(() => toRelative(date), [date])
  return (
    <Box backgroundColor='card' padding='m'>
      <Box flexDirection='row' justifyContent='space-between'>
        <Box width='65%' paddingRight='s'>
          <Text variant='subHeader' numberOfLines={2}>
            {title.rendered}
          </Text>
        </Box>
        <Text variant='subHeader' color='primary'>
          {defaultPrices[0]}
        </Text>
      </Box>
      {/**TODO: ADD EXTRA DATA HERE */}
      <Box paddingVertical={'s'}>
        <Text color={'gray'}>{relativeDate}</Text>
      </Box>
      <Box
        flexDirection={'row'}
        gap={'s'}
        marginVertical={'s'}
        flexWrap={'wrap'}
      >
        {Categories.map((cat) => {
          return (
            <Box
              key={cat.toString()}
              backgroundColor={'secondary'}
              borderRadius={'s'}
              paddingHorizontal={'s'}
              overflow={'hidden'}
            >
              <Text fontWeight='bold' color='white'>
                {cat}
              </Text>
            </Box>
          )
        })}
      </Box>
      <Text>{listivo_2863[0]}</Text>
    </Box>
  )
}
