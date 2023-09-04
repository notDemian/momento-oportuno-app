import React from 'react'
import {
  SectionList as RNSectionList,
  SectionListProps as RNSectionListProps,
} from 'react-native'
import { Box } from '../Box'
import { Button } from '../Button'
import { Divider } from '../Divider'
import { Text } from '../Text'

import { useScrollToTop } from '@react-navigation/native'
import { useExploreStackNavigation } from '@src/hooks'
import { fontSize, useAppTheme } from '@src/theme'

export function SectionList<T>({
  contentContainerStyle,
  ...rest
}: RNSectionListProps<T>) {
  const { colors } = useAppTheme()
  const ref = React.useRef(null)
  useScrollToTop(ref)

  const renderDivider = () => {
    return <Divider />
  }

  const nav = useExploreStackNavigation()

  return (
    <RNSectionList
      ref={ref}
      ItemSeparatorComponent={renderDivider}
      ListEmptyComponent={
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='secondary' fontSize={fontSize.xl}>
            No encontramos lo que buscabas :(
          </Text>
          <Button
            isFullWidth
            padding={'xl'}
            onPress={() => {
              nav.goBack()
            }}
          >
            <Text
              variant='subHeader'
              textAlign={'center'}
              color={'white'}
              fontSize={fontSize.xl}
            >
              Ir al inicio
            </Text>
          </Button>
        </Box>
      }
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        {
          backgroundColor: colors.card,
        },
        contentContainerStyle,
      ]}
      {...rest}
    />
  )
}
