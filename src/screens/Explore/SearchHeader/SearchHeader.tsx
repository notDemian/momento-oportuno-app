import { Box, TextField } from '@src/components'
import { useAppTheme } from '@src/theme'

export const SearchHeader = () => {
  const { colors } = useAppTheme()
  return (
    <Box
      padding='s'
      paddingBottom={'none'}
      position={'relative'}
      top={-40}
      zIndex={10}
    >
      <TextField
        backgroundColor='white'
        leftIcon='search'
        inputProps={{
          placeholder: 'Busca el anuncio que buscas',
          placeholderTextColor: colors.text,
        }}
        leftIconColor={colors.secondary}
      />
    </Box>
  )
}
