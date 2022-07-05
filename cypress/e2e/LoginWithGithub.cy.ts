describe('Login', () => {
  it('should go to validation screen', () => {
    Cypress.Cookies.defaults({
      preserve: /.*/,
    });
    cy.visit('http://localhost:3000');
    cy.get('.login-button').click();
    cy.get('input[id="login_field"]').type(Cypress.env('GithubUsername'));
    cy.get('input[id="password"]').type(Cypress.env('GithubPassword'));
    cy.get('.btn').click();
  });
});
