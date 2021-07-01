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
