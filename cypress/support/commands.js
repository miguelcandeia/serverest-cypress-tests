const api = () => Cypress.env('apiUrl')

// Cria usuário pela API (útil como pré-condição dos testes de frontend).
Cypress.Commands.add('createUserApi', (user) =>
  cy.request({ method: 'POST', url: `${api()}/usuarios`, body: user })
)

// Faz login pela API e devolve o token (Bearer ...).
Cypress.Commands.add('loginApi', ({ email, password }) =>
  cy
    .request({ method: 'POST', url: `${api()}/login`, body: { email, password } })
    .its('body.authorization')
)

// Cria produto pela API usando o token informado.
Cypress.Commands.add('createProductApi', (product, token) =>
  cy.request({
    method: 'POST',
    url: `${api()}/produtos`,
    headers: { Authorization: token },
    body: product,
  })
)

// Cria um admin e devolve { user, token } para uso nos testes de API.
Cypress.Commands.add('createAdminWithToken', (user) =>
  cy.createUserApi(user).then(() =>
    cy.loginApi(user).then((token) => ({ user, token }))
  )
)
