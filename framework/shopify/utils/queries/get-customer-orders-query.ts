export const getCustomerOrdersQuery = /* GraphQL */ `
query getCustomerOrders($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    orders(first: 10) {
      edges {
        node {
          id
          name
          totalPrice
          fulfillmentStatus
          currencyCode
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
