module.exports = {
  // stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],
  stories: ['../src/components/elements/**/*.stories.tsx'],
  addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
    source: { type: 'dynamic'
  },
  typescript: {
    reactDocgen: 'react-docgen',
    skipBabel: true,
    check: false,
  },
}
}
