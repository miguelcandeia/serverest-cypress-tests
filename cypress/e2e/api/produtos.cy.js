import { buildUser, buildProduct } from '../../factories/userFactory'
import { MESSAGES } from '../../support/messages'
import { SCHEMAS, expectSchema } from '../../support/schemas'

describe('API - Produtos', () => {
  const url = () => `${Cypress.env('apiUrl')}/produtos`

  it('deve cadastrar um produto com token de administrador e persistir os dados', () => {
    const produto = buildProduct()

    cy.createAdminWithToken(buildUser()).then(({ token }) => {
      cy.createProductApi(produto, token).then(({ status, body }) => {
        expect(status).to.eq(201)
        expectSchema(body, SCHEMAS.criacao)
        expect(body.message).to.eq(MESSAGES.CADASTRO_SUCESSO)

        cy.request('GET', `${url()}/${body._id}`).then(({ status, body: criado }) => {
          expect(status).to.eq(200)
          expectSchema(criado, SCHEMAS.produto)
          expect(criado).to.include({ ...produto, _id: body._id })
        })
      })
    })
  })
})
