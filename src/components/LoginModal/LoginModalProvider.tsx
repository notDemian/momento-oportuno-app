import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react'

import { LoginModalContextType } from './types'

const LoginModalContext = createContext<LoginModalContextType | null>(null)

const LoginModalPortal: FC<PropsWithChildren> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const ctx = useMemo<LoginModalContextType>(
    () => ({ setShowLoginModal, showLoginModal }),
    [showLoginModal, setShowLoginModal],
  )

  return (
    <LoginModalContext.Provider value={ctx}>
      {children}
    </LoginModalContext.Provider>
  )
}

export { LoginModalContext, LoginModalPortal }
