/// <reference types="cypress" />
import login from "../helpers/login";
import { aliasMutation, aliasQuery, hasOperationName } from "../helpers/graphql-test-utils";
import customerAccessTokenCreateData from "../../fixtures/customerAccessTokenCreateData";
import getCustomerData from "../../fixtures/getCustomerData";
import getCustomerOrdersData from "../../fixtures/getCustomerOrdersData";
import credentials from "../../fixtures/loginCredentials"

const mockData = { // Define mockData to use for this test
  customerAccessTokenCreateData: customerAccessTokenCreateData,
  getCustomerData: getCustomerData,
  getCustomerOrdersData: getCustomerOrdersData
}

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    getCustomer: 'getCustomer',
    Orders: 'getCustomerOrders'
  },
  Mutation: {
    customerAccessTokenCreate: 'customerAccessTokenCreate',
  }
}

describe('Retrieve orders', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql.json', (req) => { // GraphQL Queries and mutations to intercept in this test
      for (const key in operations) { // Iterate through operations
        for (const value in operations[key]) { // iterate though queries and mutations
          if (key === 'queries') { // For queries in operations
            aliasQuery(req, operations[key][value])
          } else if (key === 'mutations') { // For mutations in operations
            aliasMutation(req, operations[key][value])
          }
        }
      }
    })

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in user with orders and assert orders in dom', () => {
    cy.intercept('POST', '**/graphql.json', (req) => { // Intercept all GraphQL queries
      for (const key in operations) {
        for (const value in operations[key]) {
          if (hasOperationName(req, operations[key][value])) {
            req.alias = `${operations[key][value]}${key}` // Declare the alias from the initial intercept in the beforeEach
            req.reply( (res) => {
              res.body = mockData[`${operations[key][value]}Data`] // Modify the response body directly with mock mockData
              console.log(res.body);
            })
          }
        }
      }
    })

    cy.wait(250)
    cy.findByText('Accept cookies').click()

    login(credentials)

    cy.get('button[aria-label="Menu"]').click()
    cy.findByText('My Orders').click()

    cy.wait('@getCustomerOrdersQuery').then(interception => {
      assert.isNotNull(interception.response.body, 'getCustomerOrdersQuery API call has mockData')
    })

    cy.location('pathname').should('include', 'orders')

    cy.findAllByText('My Orders')
    const orders = cy.get('.mx-auto > .flex-1.justify-center').find('> div', { timeout: 5000 })
    orders.should('contain.text', 'Order: #')
    orders.should('have.length.above', 1)
  })
})
