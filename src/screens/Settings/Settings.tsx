import React from 'react';
import { Switch, ScrollView, Linking, I18nManager, Alert } from 'react-native';
import {
  Text,
  Icon,
  Divider,
  Section,
  ListRowItem,
  Box,
  IconProps,
} from '@src/components';
import { ChangeAppearanceModal } from './ChangeAppearanceModal';
import { ChangeLanguageModal } from './ChangeLanguageModal';
import { ThemeContext } from '@src/theme';
import { getStoreURL } from '@src/utils';

export const Settings = () => {
  const { theme, useSystemTheme } = React.useContext(ThemeContext);
  const [enableRTL, setEnableRTL] = React.useState(false);
  const [isAppearanceModalVisible, setIsAppearanceModalVisible] =
    React.useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    React.useState(false);

  React.useEffect(() => {
    setEnableRTL(I18nManager.isRTL);
  }, []);

  const hideAppearanceModal = () => {
    setIsAppearanceModalVisible(false);
  };

  const hideLanguageModal = () => {
    setIsLanguageModalVisible(false);
  };

  const renderAppSettingsSection = () => {
    const chevronIconName: IconProps['name'] = I18nManager.isRTL
      ? 'chevron-back'
      : 'chevron-forward';
    return (
      <Section title="App Settings">
        <ListRowItem
          title="Appearance"
          onPress={() => setIsAppearanceModalVisible(true)}
          rightElement={
            <Box flexDirection="row" alignItems="center">
              <Text marginRight="xs" textTransform="capitalize">
                {useSystemTheme ? 'System' : theme?.toString()}
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
          title="RTL Layout"
          rightElement={
            <Switch
              value={enableRTL}
              onValueChange={() => {
                setEnableRTL(!enableRTL);
                I18nManager.forceRTL(!enableRTL);
                Alert.alert(
                  'Reload this page',
                  'Please reload this page to change the UI direction! ',
                );
              }}
            />
          }
        />
        <Divider />
        <ListRowItem
          title="Language"
          onPress={() => setIsLanguageModalVisible(true)}
          rightElement={
            <Box flexDirection="row" alignItems="center">
              <Text marginRight="xs" textTransform="capitalize">
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
    );
  };

  const renderMoreInformationSection = () => {
    return (
      <Section title="More Information">
        <ListRowItem
          title="About Us"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title="Rate The App"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title="Follow Us On Facebook"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title="Follow Us On Instagram"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title="Visit Our Website"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
        <Divider />
        <ListRowItem
          title="Contact Us"
          onPress={() => Linking.openURL(getStoreURL())}
          hasChevron
        />
      </Section>
    );
  };

  return (
    <Box flex={1}>
      <ScrollView>
        {renderAppSettingsSection()}
        {renderMoreInformationSection()}
      </ScrollView>
      <ChangeAppearanceModal
        isVisible={isAppearanceModalVisible}
        hideModal={hideAppearanceModal}
      />
      <ChangeLanguageModal
        isVisible={isLanguageModalVisible}
        hideModal={hideLanguageModal}
      />
    </Box>
  );
};
