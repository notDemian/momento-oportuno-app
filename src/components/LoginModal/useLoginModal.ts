import { useCallback, useContext } from 'react'

import { LoginModalContext } from './LoginModalProvider'
import { LoginModalOpts } from './types'

import { useAppSelector } from '@src/hooks'

const useLoginModal = () => {
  const ctx = useContext(LoginModalContext)

  if (!ctx) {
    throw new Error('useLoginModal must be used within LoginModalProvider')
  }

  const isLoggedIn = useAppSelector((s) => s.auth.user)

  const open = useCallback(
    (opts?: LoginModalOpts) => {
      ctx.setOpts(opts)
      ctx.setShowLoginModal(true)
    },
    [ctx],
  )

  const close = useCallback(() => {
    ctx.setShowLoginModal(false)
    ctx.setOpts(undefined)
  }, [ctx])

  const setMessage = useCallback((message: string) => {
    ctx.setOpts((p) => ({ ...p, message }))
  }, [])

  const setUseToast = useCallback((useToast: boolean) => {
    ctx.setOpts((p) => ({ ...p, useToast }))
  }, [])

  return {
    open,
    close,
    isOpen: ctx.showLoginModal,
    isLoggedIn,
    setMessage,
    setUseToast,
  }
}

export { useLoginModal }
