interface PreferenceCheck {
  selector: string
  localStorageKey: string
  defaultValue: boolean
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Sets aliases for dark mode toggle and input.
     */
    checkPreferenceState(_isEnabled, _options: PreferenceCheck): Chainable<void>
  }
}
