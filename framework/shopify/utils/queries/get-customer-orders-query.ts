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
