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
    attributes,
    category,
    create_at,

    state,
  } = data

  const priceOrSalary =
    attributes.find((attr) => attr.name === 'Precio')?.value.toString() ??
    attributes.find((attr) => attr.name === 'Salario')?.value.toString()

  return (
    <Box backgroundColor='card' padding='m'>
      <Box flexDirection='row' justifyContent='space-between'>
        <Box width='65%' paddingRight='s'>
          <Text variant='subHeader' numberOfLines={2}>
            {title}
          </Text>
        </Box>
        <Text fontSize={fontSize.m} color='primary' fontWeight={'bold'}>
          $ {priceOrSalary} MXN
        </Text>
      </Box>
      <Box paddingVertical={'s'}>
        <Text color={'gray'}>{toRelative(create_at)}</Text>
      </Box>
      <Text>{category.name}</Text>
      <Box
        flexDirection={'row'}
        gap={'s'}
        marginVertical={'s'}
        flexWrap={'wrap'}
      >
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
              backgroundColor={'orangy'}
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
