import React from 'react'
import { ScrollView } from 'react-native'
import { AccountProps } from './Account.type'
import { AccountTabs } from './AccountViews'

export const Account: React.FC<AccountProps> = ({ navigation: _ }) => {
  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <AccountTabs />
      {/* <Box padding='m'>
        <Button
          label='Cerrar sesión'
          isFullWidth
          variant='transparent'
          onPress={onLogoutButtonPress}
        />
      </Box> */}
    </ScrollView>
  )
}
