/// <reference types="cypress" />
describe('Add product to cart', () => {
  beforeEach(() => {
    cy.visit('localhost:3000') // Run project with `yarn run build` & `yarn run start`
  })

  it('Adds product to cart and asserts shopping cart contents', () => {
    cy.findByText('Accept cookies').click()
    // cy.contains('VANS |AUTHENTIC | LO PRO | BURGANDY/WHITE').click()
    cy.get('[class^="ProductCard"]').first().click() // Click first product
    cy.wait(3000)
    cy.contains('Add to Cart').click()
    cy.findByText('My Cart').next().find('li').find("input").should('have.value', 1)
  })

  it('Removes product from cart and asserts shopping cart contents', () => {
    cy.findByText('Accept cookies').click()
    cy.get('[class^="ProductCard"]').first().click() // Click first product
    cy.wait(3000)
    cy.contains('Add to Cart').click()
    cy.get('.flex-row > .justify-between > .flex').click() // Remove from cart
    cy.findByText('My Cart').next().find('li').find("input").should('not.exist')
    cy.findByText('Your cart is empty').should('exist')
  })

})

/* global cy */
