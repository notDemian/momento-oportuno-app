import { Box, TextField } from '@src/components'
import { useAppTheme } from '@src/theme'

export const SearchHeader = () => {
  const { colors } = useAppTheme()
  return (
    <Box padding='s' paddingBottom={'none'} zIndex={10}>
      <TextField
        backgroundColor='white'
        leftIcon='search'
        inputProps={{
          placeholder: 'Estoy buscando ...',
          placeholderTextColor: colors.text,
        }}
        leftIconColor={colors.secondary}
      />
    </Box>
  )
}
