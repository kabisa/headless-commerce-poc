export const getCustomerOrdersQuery = /* GraphQL */ `
query getCustomerOrders($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    orders(first: 10) {
      edges {
        node {
          id
          name
          totalPrice
          fulfillmentStatus
        }
      }
    }
  }
}
`
export default getCustomerOrdersQuery
