const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withVungleMediation(config) {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {

      const vungleDependency = "implementation 'com.google.ads.mediation:vungle:7.4.3.0'";

      const forceAdsVersion = `
configurations.all {
    resolutionStrategy {
        force 'com.google.android.gms:play-services-ads:23.6.0'
    }
}`;

      if (!config.modResults.contents.includes(vungleDependency)) {
        config.modResults.contents = config.modResults.contents.replace(
          /dependencies\s?{/,
          `dependencies {\n    ${vungleDependency}`
        );
      }

      if (!config.modResults.contents.includes('play-services-ads:23.6.0')) {
        config.modResults.contents += forceAdsVersion;
      }
    }
    return config;
  })
}