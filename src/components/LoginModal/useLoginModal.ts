import { useContext } from 'react'

import { LoginModalContext } from './LoginModalProvider'

const useLoginModal = () => {
  const ctx = useContext(LoginModalContext)

  if (!ctx) {
    throw new Error('useLoginModal must be used within LoginModalProvider')
  }

  return {
    show: ctx.showLoginModal,
    setShow: ctx.setShowLoginModal,
  }
}

export { useLoginModal }
