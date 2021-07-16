/// <reference types="cypress" />
import { captureRequests, interceptRequests } from "../helpers/graphql-test-utils";
import { constants } from '../helpers/constants'

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    getCustomer: 'getCustomer',
    getProducts: 'getAllProducts'
  },
  Mutation: {
    checkoutCreate: 'checkoutCreate',
  }
}

describe('Perform search', () => {
  beforeEach(() => {
    captureRequests(operations)

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Performs search query and assert results', () => {
    const searchTerm = 'shoes';

    interceptRequests(operations);

    cy.wait('@checkoutCreateMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })

    cy.wait(250)
    cy.findByText('Accept cookies').click()

    cy.get(constants.searchInput).click().type(searchTerm)

    cy.get(constants.searchButtonMobile).click()

    cy.wait(`@${operations.Query.getProducts}Query`).then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })
    cy.fixture(`${operations.Query.getProducts}Data`).then(productsData => {

      cy.get('.mb-4 > .fadeIn').should('contain.html', `Showing ${productsData.data.products.edges.length} results for "<strong>${searchTerm}</strong>`)

      const searchResults = cy.get('.order-3 > .grid').find('> a', { timeout: 5000 })
      searchResults.should('have.length', productsData.data.products.edges.length)
    })
  })
})
