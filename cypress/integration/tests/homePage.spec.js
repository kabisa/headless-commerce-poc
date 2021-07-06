/// <reference types="cypress" />
import { captureRequests, interceptRequests } from "../helpers/graphql-test-utils";

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {},
  Mutation: {
    checkoutCreate: 'checkoutCreate',
  }
}

describe('The Home Page', () => {
  beforeEach(() => {
    captureRequests(operations)
    interceptRequests(operations);

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('successfully loads', () => {
    console.log('Loaded base url');

    cy.wait('@checkoutCreateMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })
  })
})
