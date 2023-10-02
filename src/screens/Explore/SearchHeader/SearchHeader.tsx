import { Box, Icon, Text, Touchable } from '@src/components'
import { useExploreStackNavigation } from '@src/hooks'
import { useAppTheme } from '@src/theme'

export const SearchHeader = () => {
  const { colors } = useAppTheme()
  const nav = useExploreStackNavigation()
  return (
    <Box padding='s' paddingBottom={'none'} zIndex={10}>
      <Touchable
        onPress={() =>
          nav.navigate('SearchTab', {
            screen: 'Search',
            params: { isSearching: true },
          })
        }
      >
        <Box
          flex={1}
          backgroundColor={'white'}
          borderRadius='m'
          padding='s'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          borderWidth={1}
          borderColor='primary'
        >
          <Text variant='primary' color='text'>
            Estoy buscando ...
          </Text>
          <Icon name='search' color={colors.secondary} />
        </Box>
      </Touchable>
    </Box>
  )
}
