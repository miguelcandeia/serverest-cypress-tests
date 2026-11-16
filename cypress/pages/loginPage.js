class LoginPage {
  visit() {
    cy.visit('/login')
  }
  fillEmail(email) {
    cy.get('[data-testid="email"]').type(email)
    return this
  }
  fillPassword(password) {
    cy.get('[data-testid="senha"]').type(password, { log: false })
    return this
  }
  submit() {
    cy.get('[data-testid="entrar"]').click()
  }
  login({ email, password }) {
    this.visit()
    this.fillEmail(email).fillPassword(password)
    this.submit()
  }
}

export default new LoginPage()
