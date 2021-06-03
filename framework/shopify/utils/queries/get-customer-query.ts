export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    displayName
    email
    phone
    tags
    acceptsMarketing
    createdAt
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
export default getCustomerQuery
