import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react'

import { LoginModal } from './LoginModal'
import { LoginModalContextType, LoginModalOpts } from './types'

const LoginModalContext = createContext<LoginModalContextType | null>(null)

const LoginModalPortal: FC<PropsWithChildren> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [opts, setOpts] = useState<LoginModalOpts>()

  const ctx = useMemo<LoginModalContextType>(
    () => ({ setShowLoginModal, showLoginModal, opts, setOpts }),
    [showLoginModal, setShowLoginModal],
  )

  return (
    <LoginModalContext.Provider value={ctx}>
      <LoginModal
        show={showLoginModal}
        setShow={setShowLoginModal}
        opts={opts}
      />
      {children}
    </LoginModalContext.Provider>
  )
}

export { LoginModalContext, LoginModalPortal }
