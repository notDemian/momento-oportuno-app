import { Box, Icon, Text, Touchable } from '@src/components'
import { useExploreStackNavigation } from '@src/hooks'
import { fontSize, getShadowBoxProps, useAppTheme } from '@src/theme'

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
          {...getShadowBoxProps({ elevation: 10 })}
          flex={1}
          backgroundColor={'white'}
          borderRadius='m'
          padding='s'
          marginHorizontal={'l'}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text variant='primary' color='orangy' fontSize={fontSize.s}>
            Estoy buscando ...
          </Text>
          <Icon name='search' color={colors.secondary} />
        </Box>
      </Touchable>
    </Box>
  )
}
