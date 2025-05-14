declare namespace Cypress {
  interface Chainable {
    /**
     * Sets aliases for dark mode toggle and input.
     */
    getDarkModeToggle(): Chainable<void>
  }
}
