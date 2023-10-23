import React from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'
import { fontSize } from '@src/theme'
import { toRelative } from '@src/utils/dates'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const {
    title,
    // defaultPrice,
    // pricesAsSalary,
    // Categories,
    // created_at,
    // jointCategories,
    // estados,
    attributes,
    category,
    create_at,
    description,
    status,
    image,
    is_featured,
    is_multistate,
    state,
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
          precio
        </Text>
      </Box>
      {/**TODO: ADD EXTRA DATA HERE */}
      <Box paddingVertical={'s'}>
        <Text color={'gray'}>{toRelative(create_at)}</Text>
      </Box>
      <Box
        flexDirection={'row'}
        gap={'s'}
        marginVertical={'s'}
        flexWrap={'wrap'}
      >
        <Text>{category.name}</Text>
        {category.children.map((cat) => {
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
      <Text>{state.name}</Text>
      <Box flexDirection={'row'} gap={'s'} flexWrap={'wrap'}>
        {attributes.map((attr) => {
          return (
            <Box
              key={attr.id.toString()}
              backgroundColor={'secondary'}
              borderRadius={'s'}
              paddingHorizontal={'s'}
              overflow={'hidden'}
            >
              <Text fontWeight='bold' color='white'>
                {attr.name}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
