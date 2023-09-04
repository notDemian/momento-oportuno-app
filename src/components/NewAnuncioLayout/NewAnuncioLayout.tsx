import { ScrollView } from 'react-native'
import { Box, Text } from '../elements'

import type { NewAnuncioLayout } from './NewAnuncioLayout.type'

import { useSafeAreaScrollViewStyles } from '@src/hooks'

export const NewAnucioLayout = ({
  title,
  subtitle,
  children,
  footer,
}: NewAnuncioLayout) => {
  const styles = useSafeAreaScrollViewStyles(true)
  return (
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
      {footer ? <Box>{footer}</Box> : null}
    </ScrollView>
  )
}
