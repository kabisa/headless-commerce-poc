import fetch from "node-fetch";

export default async function doFetch(method: string, body: {variables: any, query: string}): Promise<any> {

  const headers = {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.toString() || '',
    'Content-Type': 'application/json',
  }

  const response = fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''}/api/2021-04/graphql.json`, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  })

  return await response;
}
