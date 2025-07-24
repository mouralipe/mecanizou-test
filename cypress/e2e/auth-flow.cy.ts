describe('E2E Authentication Flow - Simplified Version', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('should complete the flow: login → products → logout', () => {
    cy.login();

    cy.url().should('include', '/produtos');
    cy.contains('h1', 'Produtos').should('be.visible');
    cy.contains('h1', 'Mecanizou').should('be.visible');

    cy.logout();

    cy.url().should('include', '/login');
    cy.getCookie('auth').should('not.exist');
  });

  it('should login with custom credentials', () => {
    cy.login('usuario', 'senha');

    cy.url().should('include', '/produtos');
    cy.contains('h1', 'Produtos').should('be.visible');
  });
});
