/// <reference types="cypress" />
import { captureRequests, interceptRequests } from "../helpers/graphql-test-utils";
import { constants } from "../helpers/constants";

const operations = { // Define GraphQL operations to intercept for this test (And differentiate between queries and mutations)
  Query: {
    checkout: 'getCheckout',
    customer: 'getCustomer',
  },
  Mutation: {
    checkoutCreate: 'checkoutCreate',
    checkoutLineItemAdd: 'checkoutLineItemAdd',
    checkoutLineItemRemove: 'checkoutLineItemRemove',
  }
}

describe('Add products to cart', () => {
  beforeEach(() => {
    captureRequests(operations)

    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Adds product to cart and asserts shopping cart contents', () => {
    interceptRequests(operations);

    cy.wait('@checkoutCreateMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutCreateQuery API call has mockData')
    })

    constants.dismissCookies()

    cy.get('[class^="ProductCard"]').first().click() // Click first product

    cy.contains('Add To Cart').click()

    cy.wait('@checkoutLineItemAddMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutLineItemAddMutation API call has mockData')
    })

    cy.findByText('My Cart').next().find('li').find("input").should('have.value', 1)

    cy.get('.h-9 > :nth-child(1)').click() // Remove from cart

    cy.wait('@checkoutLineItemRemoveMutation').then(interception => {
      assert.isNotNull(interception.response.body, 'checkoutLineItemAddMutation API call has mockData')
    })

    cy.findByText('Your cart is empty').should('exist')
  })

})
