# headless-commerce-poc

Headless e-commerce proof of concept for the graduation assignment of Jan-Willem van Bremen's internship

## Headless e-commerceplatform

As headless e-commerce platform Shopify is used

## Front-end web-framework

As front-end web-framework Next.js Commerce is used

## Project management

Product owner: Pascal Widdershoven
Guidance: Egon Meijers

## How to run locally

- Clone repository
- copy the `.env.template` file in the `framework/shopify` directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/shopify/.env.template .env.local
```

- run `yarn install`
- run `yarn run dev`

## Additional yarn commands

"dev"\
"build"\
"start"\
"analyze"\
"prettier-fix"\
"eslint-fix"\
"find:unused"\
"generate"\
"generate:definitions"\
"jest-test"\
"jest-watch"\
"cypress-open"\
"cypress-test"\
"cypress-test-ci"

# Next.js Commerce

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-description=An%20all-in-one%20starter%20kit%20for%20high-performance%20e-commerce%20sites.&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&integration-ids=oac_MuWZiE4jtmQ2ejZQaQ7ncuDT)

The all-in-one starter kit for high-performance e-commerce sites. With a few clicks, Next.js developers can clone, deploy and fully customize their own store.
Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

Demo live at: [demo.vercel.store](https://demo.vercel.store/)

- Shopify Demo: https://shopify.vercel.store/
- Swell Demo: https://swell.vercel.store/
- BigCommerce Demo: https://bigcommerce.vercel.store/
- Vendure Demo: https://vendure.vercel.store
- Saleor Demo: https://saleor.vercel.store/

## Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.
- Dark Mode Support

## Integrations

Next.js Commerce integrates out-of-the-box with BigCommerce, Shopify, Swell, Saleor and Vendure. We plan to support all major ecommerce backends.

## Considerations

- `framework/commerce` contains all types, helpers and functions to be used as base to build a new **provider**.
- **Providers** live under `framework`'s root folder and they will extend Next.js Commerce types and functionality (`framework/commerce`).
- We have a **Features API** to ensure feature parity between the UI and the Provider. The UI should update accordingly and no extra code should be bundled. All extra configuration for features will live under `features` in `commerce.config.json` and if needed it can also be accessed programatically.
- Each **provider** should add its corresponding `next.config.js` and `commerce.config.json` adding specific data related to the provider. For example in case of BigCommerce, the images CDN and additional API routes.
- **Providers don't depend on anything that's specific to the application they're used in**. They only depend on `framework/commerce`, on their own framework folder and on some dependencies included in `package.json`

## Configuration

### How to change providers

Open `.env.local` and change the value of `COMMERCE_PROVIDER` to the provider you would like to use, then set the environment variables for that provider (use `.env.template` as the base).

The setup for Shopify would look like this for example:

```
COMMERCE_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxx.myshopify.com
```

And check that the `tsconfig.json` resolves to the chosen provider:

```
  "@framework": ["framework/shopify"],
  "@framework/*": ["framework/shopify/*"]
```

That's it!

### Features

Every provider defines the features that it supports under `framework/{provider}/commerce.config.json`

#### Features Available

The following features can be enabled or disabled. This means that the UI will remove all code related to the feature.
For example: Turning `cart` off will disable Cart capabilities.

- cart
- search
- wishlist
- customerAuth
- customCheckout

#### How to turn Features on and off

> NOTE: The selected provider should support the feature that you are toggling. (This means that you can't turn wishlist on if the provider doesn't support this functionality out the box)

- Open `commerce.config.json` 
- You'll see a config file like this:
  ```json
  {
    "features": {
      "wishlist": false,
      "customCheckout": true
    }
  }
  ```
- Turn `wishlist` on by setting `wishlist` to `true`.
- Run the app and the wishlist functionality should be back on.
