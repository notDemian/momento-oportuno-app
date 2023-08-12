const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const what = defaultConfig.resolver.resolverMainFields.unshift('sbmodern');

module.exports = defaultConfig;
