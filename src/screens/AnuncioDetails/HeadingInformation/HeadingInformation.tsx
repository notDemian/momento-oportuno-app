import React from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const { title, listivo_130, listivo_2863, listivo_14: categorias } = data
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
      <Box
        flexDirection={'row'}
        gap={'s'}
        marginVertical={'s'}
        flexWrap={'wrap'}
      >
        {categorias.map((cat) => {
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
