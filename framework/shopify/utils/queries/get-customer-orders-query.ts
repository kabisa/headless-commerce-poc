export const getCustomerOrdersQuery = /* GraphQL */ `
query getCustomerOrders($customerAccessToken: String!, $cursor: String, $numberOfOrders: Int = 10) {
  customer(customerAccessToken: $customerAccessToken) {
    orders(first: $numberOfOrders, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          name
          totalPriceV2 {
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
