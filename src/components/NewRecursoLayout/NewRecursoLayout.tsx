import { ScrollView } from 'react-native'
import { Box, Text } from '../elements'

import type { NewAnuncioLayout } from './NewRecursoLayout.type'

import { useSafeAreaScrollViewStyles } from '@src/hooks'

export const NewRecursoLayout = ({
  title,
  subtitle,
  children,
  footer,
}: NewAnuncioLayout) => {
  const styles = useSafeAreaScrollViewStyles(true)
  return (
    <>
      <ScrollView contentContainerStyle={[styles.contentContainer]}>
        <Box marginTop='l' marginBottom='m'>
          <Text fontWeight='bold' variant='largeHeader'>
            {title}
          </Text>
          {subtitle ? (
            <Text variant='secondary' marginVertical='s'>
              {subtitle}
            </Text>
          ) : null}
          <Box marginTop='m'>{children}</Box>
        </Box>
      </ScrollView>
      {footer ? (
        <Box paddingHorizontal={'m'} marginBottom={'m'}>
          {footer}
        </Box>
      ) : null}
    </>
  )
}
