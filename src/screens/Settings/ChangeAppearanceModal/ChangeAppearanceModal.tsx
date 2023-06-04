import React from 'react';
import {
  BottomSheetModal,
  Box,
  RadioButton,
  RadioOption,
  Text,
} from '@src/components';
import { ThemeContext } from '@src/theme';
import { ColorSchemeName } from 'react-native';
import { ChangeAppearanceModalProps } from './ChangeAppearanceModal.type';

const appearanceOptions: RadioOption[] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'System',
    value: '',
  },
];

export const ChangeAppearanceModal: React.FC<ChangeAppearanceModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const { setTheme, theme, useSystemTheme, setUseSystemTheme } =
    React.useContext(ThemeContext);

  let defaultValue = theme;
  if (useSystemTheme) {
    defaultValue = null;
  }

  const onItemPress = (item: RadioOption) => {
    const selectedTheme = item.value;
    if (selectedTheme !== '') {
      setTheme(selectedTheme as ColorSchemeName);
      setUseSystemTheme(false);
    } else {
      setTheme(null);
      setUseSystemTheme(true);
    }
  };

  return (
    <BottomSheetModal
      isOpened={isVisible}
      useScrollView
      snapPoints={['40%']}
      onClose={hideModal}>
      <Box>
        <Text textAlign="center" variant="header">
          Change Appearance
        </Text>
        <Box marginTop="m">
          <RadioButton
            data={appearanceOptions}
            onItemPress={onItemPress}
            defaultValue={defaultValue || ''}
          />
        </Box>
      </Box>
    </BottomSheetModal>
  );
};
