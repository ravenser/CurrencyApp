const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  const {
    resolver: { sourceExts, assetExts },
  } = config;

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...config.resolver,
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    unstable_conditionNames: ["browser", "require", "react-native"],
    blacklistRE: exclusionList([
      /.*\.test\.js$/,
      /.*\.test\.ts$/,
      /.*\.test\.tsx$/,
      /.*\.spec\.js$/,
      /.*\.spec\.ts$/,
      /.*\.spec\.tsx$/,
    ]),
  };

  return config;
})();
