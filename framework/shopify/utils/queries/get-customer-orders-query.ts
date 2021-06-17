export const getCustomerOrdersQuery = /* GraphQL */ `
query getCustomerOrders($customerAccessToken: String!, $cursor: String = null, $numberOfOrders: Int = 10) {
  customer(customerAccessToken: $customerAccessToken) {
    orders(first: $numberOfOrders, sortKey: PROCESSED_AT, reverse: true, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          name
          subtotalPriceV2 {
            currencyCode
            amount
          }
          totalPriceV2 {
            currencyCode
            amount
          }
          totalShippingPriceV2 {
            currencyCode
            amount
          }
          fulfillmentStatus
          processedAt
          lineItems(first: 5) {
            edges {
              node {
                quantity
                title
                variant {
                  id
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          id
                          transformedSrc(maxWidth:128, maxHeight:128)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
` // Get first 10 customer orders
export default getCustomerOrdersQuery
