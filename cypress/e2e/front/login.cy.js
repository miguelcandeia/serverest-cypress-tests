import loginPage from '../../pages/loginPage'
import { buildUser } from '../../factories/userFactory'
import { MESSAGES } from '../../support/messages'

describe('Frontend - Login', () => {
  it('deve exibir erro ao logar com senha inválida', () => {
    const user = buildUser()
    cy.createUserApi(user)

    loginPage.login({ email: user.email, password: 'senhaErrada123' })

    cy.contains(MESSAGES.LOGIN_INVALIDO).should('be.visible')
    cy.url().should('include', '/login')
  })

  it('deve direcionar um usuário comum para a home de cliente, fora da área admin', () => {
    const user = buildUser({ administrador: 'false' })
    cy.createUserApi(user)

    loginPage.login(user)

    cy.url().should('include', '/home')
    cy.url().should('not.include', '/admin')
  })
})
