module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ar'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['fr'],
  },
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
