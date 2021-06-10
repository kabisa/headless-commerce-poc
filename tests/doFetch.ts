export default async function doFetch(method: string, body: {}) {

  const response = fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql.json`, {
    method: method,
    body: JSON.stringify(body),
    // @ts-ignore
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  })

  return await response;
}
