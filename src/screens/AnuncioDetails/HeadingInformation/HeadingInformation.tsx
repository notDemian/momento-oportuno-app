import React from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'
import { fontSize } from '@src/theme'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const {
    title,
    defaultPrice,
    pricesAsSalary,
    Categories,
    created_at,
    jointCategories,
    estados,
  } = data

  return (
    <Box backgroundColor='card' padding='m'>
      <Box flexDirection='row' justifyContent='space-between'>
        <Box width='65%' paddingRight='s'>
          <Text variant='subHeader' numberOfLines={2}>
            {title}
          </Text>
        </Box>
        <Text fontSize={fontSize.m} color='primary' fontWeight={'bold'}>
          {defaultPrice ?? pricesAsSalary}
        </Text>
      </Box>
      {/**TODO: ADD EXTRA DATA HERE */}
      <Box paddingVertical={'s'}>
        <Text color={'gray'}>{created_at}</Text>
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
              key={cat.id.toString()}
              backgroundColor={'secondary'}
              borderRadius={'s'}
              paddingHorizontal={'s'}
              overflow={'hidden'}
            >
              <Text fontWeight='bold' color='white'>
                {cat.name}
              </Text>
            </Box>
          )
        })}
      </Box>
      <Text>{estados.map((p) => p.name).join()}</Text>
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
