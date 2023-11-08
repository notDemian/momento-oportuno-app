import React from 'react'

import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Text } from '@src/components/elements'
import { fontSize } from '@src/theme'
import { Constants, formatCurrency } from '@src/utils'
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
    attributes.find((a) => a.id === Constants.IDS.price)?.value.toString() ??
    attributes.find((a) => a.id === Constants.IDS.salary)?.value.toString()

  const priceDisplay = priceOrSalary
    ? formatCurrency(priceOrSalary)
    : `$ ${priceOrSalary} MXN`

  return (
    <Box backgroundColor='card' padding='m'>
      <Box
        flexDirection='row'
        justifyContent='space-between'
        alignItems={'baseline'}
      >
        <Box width='65%' paddingRight='s'>
          <Text variant='subHeader' numberOfLines={2}>
            {title}
          </Text>
        </Box>
        <Text variant='subHeader' color='primary' fontSize={fontSize.m}>
          {priceDisplay}
        </Text>
      </Box>
      <Box paddingVertical={'s'}>
        <Text color={'gray'}>{toRelative(create_at)}</Text>
      </Box>
      <Text variant={'body'}>{category.name}</Text>
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
      <Box marginBottom={'s'}>
        <Text variant={'body'} color='secondary'>
          {state.name}
        </Text>
      </Box>
      <Box flexDirection={'row'} gap={'s'} flexWrap={'wrap'}>
        {attributes
          .filter(
            (att) =>
              !(
                att.id === Constants.IDS.price ||
                att.id === Constants.IDS.salary
              ),
          )
          .map((attr) => {
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
                  {': '}
                  {typeof attr.value === 'object'
                    ? attr.value.map((v) => v.name).join(',')
                    : attr.value}
                </Text>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}
