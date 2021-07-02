// utils/graphql-test-utils.js

// Utility to match GraphQL mutation or query based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req
  const regex = /(?<=[\s]+[A-z]+[\s])[^(]*/;
  if (body.query.match(regex)[0] === operationName) {
    console.log(`${operationName} request... \n\n ${body.query}`);
  }
  return (
    body.query.match(regex)[0] === operationName
  )
}

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}Query`
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}Mutation`
  }
}

export const  captureRequests = (operations, method = 'POST', matcher = '**/graphql.json') => { // Used in the beforeEach hook in cypress tests to capture all requests and alias them
  cy.intercept(method, matcher, (req) => { // GraphQL Queries and mutations to intercept in this test
    console.log(req); // Log all graphql requests made
    for (const key in operations) { // Iterate through operations
      for (const value in operations[key]) { // iterate though queries and mutations
        if (key === 'Query') { // For queries in operations
          aliasQuery(req, operations[key][value])
        } else if (key === 'Mutation') { // For mutations in operations
          aliasMutation(req, operations[key][value])
        }
      }
    }
  })
};

export const interceptRequests = (operations, method = 'POST', matcher = '**/graphql.json') => { // Used in beginning of the test to intercept requests and
  cy.intercept(method, matcher, (req) => { // Intercept all GraphQL queries
    console.log(req); // Log all graphql requests made
    for (const key in operations) {
      for (const value in operations[key]) {
        if (hasOperationName(req, operations[key][value])) {
          req.alias = `${operations[key][value]}${key}` // Declare the alias from the initial intercept in the beforeEach
          req.reply({ // Modify response with mock data
              fixture: `${operations[key][value]}Data.json` || {}, // Fixture data file name in /cypress/fixtures folder
              delay: 500,
            }
          )
        }
      }
    }
  })
};
