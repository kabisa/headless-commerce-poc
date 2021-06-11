/// <reference types="cypress" />
import login from "../helpers/login";

describe('Retrieve orders', () => {
  beforeEach(() => {
    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in user with orders and assert orders in dom', () => {
    const credentials = {email: 'janwillemvanbremen@live.nl', password: 'Tjukeprie12@2TF'}

    cy.wait(250)
    cy.findByText('Accept cookies').click()
    // cy.contains('VANS |AUTHENTIC | LO PRO | BURGANDY/WHITE').click()

    login(credentials)

    cy.get('button[aria-label="Menu"]').click()
    cy.findByText('My Orders').click()

    cy.location('pathname').should('include', 'orders')
    cy.findByText('My Orders')
    cy.wait(2500)
    const orders = cy.get('.mx-auto > .flex-1.justify-center').find('> div')
    orders.should('contain.text', 'Order: #')
    orders.should('have.length.above', 1)
  })

})

/* global cy */
