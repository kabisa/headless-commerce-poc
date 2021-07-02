/// <reference types="cypress" />
import login from "../helpers/login";
import { captureRequests, interceptRequests } from "../helpers/graphql-test-utils";
import credentials from "../../fixtures/loginCredentials";
import { constants } from "../helpers/constants";

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    orders: 'getCustomerOrders',
    products: 'getProducts'
  },
  Mutation: {
    checkoutCreate: 'checkoutCreate',
  }
}

describe('Retrieve orders', () => {
  beforeEach(() => {
    captureRequests(operations)

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in user with orders and assert orders in dom', () => {
    interceptRequests(operations);

    cy.wait('@checkoutCreateMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })

    constants.dismissCookies()

    login(credentials)

    cy.get(constants.menuButton).click()
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
