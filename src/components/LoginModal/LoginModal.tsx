import { memo } from 'react'
import { Box } from '../elements'

import { useLoginModal } from './useLoginModal'

const LoginModal = memo(() => {
  const { setShow, show } = useLoginModal()

  if (!show) return null

  return <Box></Box>
})

export { LoginModal }
