const commerce = require('./commerce.config.json')
const { withCommerceConfig, getProviderName } = require('./framework/commerce/config')
const withPWA = require('next-pwa')

const provider = commerce.provider || getProviderName()
const isBC = provider === 'bigcommerce'
const isShopify = provider === 'shopify'

module.exports = withPWA(
  withCommerceConfig({
  commerce,
  i18n: {
    locales: ['en-US', 'es', 'nl'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      (isBC || isShopify) && {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
        source: '/logout',
        destination: '/api/bigcommerce/customers/logout?redirect_to=/',
      },
      // Rewrites for /search
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
    ].filter((x) => x)
  },
  future: {
    webpack5: true
  },
  pwa: {
    dest: 'public'
  }
}))

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
