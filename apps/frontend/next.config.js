// apps/frontend/next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
module.exports = withNextIntl({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ka', 'en', 'ru'],
    defaultLocale: 'ka',
  },
});