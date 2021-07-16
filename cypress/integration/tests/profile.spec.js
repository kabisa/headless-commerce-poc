/// <reference types="cypress" />
import { captureRequests, interceptRequests } from "../helpers/graphql-test-utils";
import login from "../helpers/login";
import credentials from "../../fixtures/loginCredentials.json";
import { constants } from '../helpers/constants'

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    getCustomer: 'getCustomer'
  },
  Mutation: {
    checkoutCreate: 'checkoutCreate',
  }
}

describe('Profile page', () => {
  beforeEach(() => {
    captureRequests(operations)

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in and access profile page', () => {
    interceptRequests(operations);

    cy.wait('@checkoutCreateMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })

    cy.wait(250)
    cy.findByText('Accept cookies').click()

    login(credentials)

    cy.get(constants.menuButton).click()
    cy.findByText('My Profile').click()

    cy.location('pathname').should('include', 'profile')

    cy.fixture('getCustomerData').then(customerData => {
      cy.findByText(`${customerData.data.customer.firstName} ${customerData.data.customer.lastName}`).should('exist')
      cy.findByText(customerData.data.customer.email).should('exist')
      cy.findByText(new Date(Date.parse(customerData.data.customer.createdAt)).toDateString()).should('exist')
    })
  })
})
