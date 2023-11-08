import { Icon, Touchable } from '@src/components'
import { useAppTheme } from '@src/theme'

export function AddButtonComponent({ nav }: { nav: () => void }) {
  const { colors } = useAppTheme()

  return (
    <Touchable onPress={nav}>
      <Icon name='add' size={36} color={colors.white} />
    </Touchable>
  )
}
