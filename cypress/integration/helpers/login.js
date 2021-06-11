/// <reference types="cypress" />

export default function login(credentials = {email, password}) {

  cy.get('.UserNav_avatarButton__1O6kn').click()
  cy.findByPlaceholderText('Email').click().type(credentials.email)
  cy.findByPlaceholderText('Password').click().type(credentials.password)
  cy.findByText('Log In').click()
  cy.wait(1500)
}

/* global cy */
