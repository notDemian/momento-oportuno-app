import { useCallback } from 'react'

import { Icon, Touchable, useLoginModal } from '@src/components'
import { useAppTheme } from '@src/theme'

export function AddButtonComponent({ nav }: { nav: () => void }) {
  const { colors } = useAppTheme()

  const { isLoggedIn, open } = useLoginModal()

  const innerNav = useCallback(() => {
    if (!isLoggedIn) {
      open({
        message: 'Para crear un recurso debes iniciar sesión',
      })
      return
    }

    nav()
  }, [nav, isLoggedIn, open])

  return (
    <Touchable onPress={innerNav}>
      <Icon name='add' size={36} color={colors.white} />
    </Touchable>
  )
}
