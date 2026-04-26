const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {

      const resPath = path.join(config.modRequest.projectRoot, 'android/app/src/main/res/xml');
      const filePath = path.join(resPath, 'gma_ad_services_config.xml');

      if (!fs.existsSync(resPath)) {
        fs.mkdirSync(resPath, { recursive: true });
      }

      const content = `<?xml version="1.0" encoding="utf-8"?>
<ad-services-config>
    <attest-ad-id enabled="true" />
</ad-services-config>`;

      fs.writeFileSync(filePath, content);

      return config;
    },
  ]);
};
