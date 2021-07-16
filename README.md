# headless-commerce-poc

Headless e-commerce proof of concept for the graduation assignment of Jan-Willem van Bremen's internship

## Headless e-commerce platform

As headless e-commerce platform Shopify is used

## Front-end web-framework

As front-end web-framework Next.js Commerce is used

## Project management

Product owner: **Pascal Widdershoven**

Guidance: **Egon Meijers**

## How to run locally

- Clone repository
- copy the `.env.template` file in the `framework/shopify` directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/shopify/.env.template .env.local
```

- run `yarn install`
- run `yarn run dev`

## Additional yarn commands

    "dev" : Run development mode server
    "build" : Generate production build
    "postbuild" : Post build script to generate sitemap
    "start" : Start local server to serve production build
    "analyze" : Bundle analyzer (Executed on build)
    "prettier-fix : Use `prettier` to fix
    "eslint-fix" : Use `eslint` to fix
    "next-lint": : Run next.js linter
    "find:unused" : Run next-unused to find unused files
    "generate" : Run graphql-codegen
    "generate:shopify" : Run graphql-codegen for Shopify provider
    "jest:test" : Run jest tests
    "jest:watch" : Run jest file watcher
    "cypress:open" : Open cypress e2e testing
    "cypress:test" : Run cypress e2e tests
    "cypress:test-ci" : Run cypress e2e tests in continuous integration mode

## Features

- Performant by default
- Personalisation
- SEO Ready
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Dark Mode Support

## Integrations
