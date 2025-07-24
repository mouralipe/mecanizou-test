// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    login(username?: string, password?: string): Chainable<void>;
    logout(): Chainable<void>;
  }
}
