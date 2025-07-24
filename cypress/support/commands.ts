// cypress/support/commands.ts

// Comando para fazer login
Cypress.Commands.add(
  'login',
  (username = 'usuario_teste', password = 'senha123') => {
    cy.visit('/login');
    cy.get('input[placeholder="Digite seu usuário"]').type(username);
    cy.get('input[placeholder="Digite sua senha"]').type(password);
    cy.get('button[type="submit"]').click();
  }
);

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Sair")').length > 0) {
      cy.contains('button', 'Sair').click();
    } else if ($body.find('button:contains("Logout")').length > 0) {
      cy.contains('button', 'Logout').click();
    } else if ($body.find('a:contains("Sair")').length > 0) {
      cy.contains('a', 'Sair').click();
    } else if ($body.find('a:contains("Logout")').length > 0) {
      cy.contains('a', 'Logout').click();
    } else {
      // Se não encontrar botão de logout, fazer logout via API
      cy.request('POST', '/api/auth/logout');
      cy.visit('/login');
    }
  });
});

// Os tipos estão definidos em index.d.ts
