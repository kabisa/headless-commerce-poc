/// <reference types="cypress" />

export default function login(credentials = { email, password }) {

  cy.get('.UserNav_avatarButton__1O6kn').click()
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
