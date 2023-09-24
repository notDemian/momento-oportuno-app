import React, { useMemo } from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'
import { fontSize } from '@src/theme'
import { toRelative } from '@src/utils/dates'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const {
    title,
    defaultPrices,
    pricesAsSalary,
    fullData: { listivo_2863 },
    Categories,
    date,
    jointCategories,
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
        <Text fontSize={fontSize.m} color='primary' fontWeight={'bold'}>
          {defaultPrices[0] ?? pricesAsSalary[0]}
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
      <Box flexDirection={'row'} gap={'s'} flexWrap={'wrap'}>
        {jointCategories.map((cat) => {
          return (
            <Box
              key={cat.toString()}
              backgroundColor={'creamy'}
              borderRadius={'s'}
              p={'s'}
              overflow={'hidden'}
            >
              <Text>{cat}</Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
