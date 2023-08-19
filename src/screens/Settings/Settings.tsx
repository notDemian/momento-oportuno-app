import React from 'react'
import { Switch, ScrollView, Linking, I18nManager, Alert } from 'react-native'
import {
  Text,
  Icon,
  Divider,
  Section,
  ListRowItem,
  Box,
  IconProps,
} from '@src/components'
import { ChangeAppearanceModal } from './ChangeAppearanceModal'
import { ChangeLanguageModal } from './ChangeLanguageModal'
import { ThemeContext } from '@src/theme'
import { getStoreURL } from '@src/utils'

export const Settings = () => {
  const { theme, useSystemTheme } = React.useContext(ThemeContext)
  const [enableRTL, setEnableRTL] = React.useState(false)
  const [isAppearanceModalVisible, setIsAppearanceModalVisible] =
    React.useState(false)
  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    React.useState(false)

  React.useEffect(() => {
    setEnableRTL(I18nManager.isRTL)
  }, [])

  const hideAppearanceModal = () => {
    setIsAppearanceModalVisible(false)
  }

  const hideLanguageModal = () => {
    setIsLanguageModalVisible(false)
  }

  const renderAppSettingsSection = () => {
    const chevronIconName: IconProps['name'] = I18nManager.isRTL
      ? 'chevron-back'
      : 'chevron-forward'
    return (
      <Section title='Ajustes de la aplicación'>
        <ListRowItem
          title='Apariencia'
          onPress={() => setIsAppearanceModalVisible(true)}
          rightElement={
            <Box flexDirection='row' alignItems='center'>
              <Text marginRight='xs' textTransform='capitalize'>
                {useSystemTheme ? 'Sistema' : theme?.toString()}
              </Text>
              <Icon name={chevronIconName} />
            </Box>
          }
          rightContainerProps={{
            flex: 3,
          }}
        />

        <Divider />
        <ListRowItem
          title='Language'
          onPress={() => setIsLanguageModalVisible(true)}
          rightElement={
            <Box flexDirection='row' alignItems='center'>
              <Text marginRight='xs' textTransform='capitalize'>
                English
              </Text>
              <Icon name={chevronIconName} />
            </Box>
          }
          rightContainerProps={{
            flex: 3,
          }}
        />
      </Section>
    )
  }

  return (
    <Box flex={1}>
      <ScrollView>{renderAppSettingsSection()}</ScrollView>
      <ChangeAppearanceModal
        isVisible={isAppearanceModalVisible}
        hideModal={hideAppearanceModal}
      />
      <ChangeLanguageModal
        isVisible={isLanguageModalVisible}
        hideModal={hideLanguageModal}
      />
    </Box>
  )
}
