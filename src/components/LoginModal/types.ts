export type LoginModalOpts = {
  message?: string
  useToast?: boolean
}

export type LoginModalContextType = {
  showLoginModal: boolean
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  opts?: LoginModalOpts
  setOpts: React.Dispatch<React.SetStateAction<LoginModalOpts | undefined>>
}
