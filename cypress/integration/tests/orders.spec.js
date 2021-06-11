/// <reference types="cypress" />
describe('Retrieve orders', () => {
  beforeEach(() => {
    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in user with orders', () => {
    cy.findByText('Accept cookies').click()
    // cy.contains('VANS |AUTHENTIC | LO PRO | BURGANDY/WHITE').click()



  })

})

/* global cy */
