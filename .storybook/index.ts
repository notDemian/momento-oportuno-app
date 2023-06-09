import { getStorybookUI, configure } from '@storybook/react-native';
import './storybook.requires';

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
});

export default StorybookUIRoot;
