/// <reference types="cypress" />
import login from "../helpers/login";

describe('Retrieve orders', () => {
  beforeEach(() => {
    cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
  })

  it('Logs in user with orders and assert orders in dom', () => {
    const credentials = {email: 'janwillemvanbremen@live.nl', password: 'JanWillem123'}

    cy.wait(250)
    cy.findByText('Accept cookies').click()

    login(credentials)

    cy.get('button[aria-label="Menu"]').click()
    cy.findByText('My Orders').click()

    cy.location('pathname').should('include', 'orders')
    cy.findByText('My Orders')
    const orders = cy.get('.mx-auto > .flex-1.justify-center').find('> div', { timeout: 5000 })
    orders.should('contain.text', 'Order: #')
    orders.should('have.length.above', 1)
  })
})

/* global cy */
