/// <reference types="cypress" />

import { interceptRequests } from "./graphql-test-utils";
import { constants } from "./constants";

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    getCustomer: 'getCustomer',
  },
  Mutation: {
    customerAccessTokenCreate: 'customerAccessTokenCreate',
  }
}

export default function login(credentials = {email, password}) {

  interceptRequests(operations);

  cy.get(constants.menuButton).click()
  cy.findByPlaceholderText('Email').click().type(credentials.email)
  cy.findByPlaceholderText('Password').click().type(credentials.password)
  cy.findByText('Log In').click()

  cy.wait('@customerAccessTokenCreateMutation').then(interception => {
    assert.isNotNull(interception.response.body, 'customerAccessTokenCreateMutation API call has data')
  })

  cy.wait('@getCustomerQuery').then(interception => {
    assert.isNotNull(interception.response.body, 'getCustomerQuery API call has data')
  })

  cy.waitUntil(() => cy.findByText("Successfully logged in!"))
  cy.findByText("Successfully logged in!").should("not.exist")
}
