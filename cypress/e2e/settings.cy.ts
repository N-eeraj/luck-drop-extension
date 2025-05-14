describe("Settings Test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.get("button").contains("Settings").click()
    cy.get("[data-cy=\"settings-view\"]").should("exist")
  })

  it("Checks settings view has correct title", () => {
    cy.get("h1")
      .should("be.visible")
      .invoke("text")
      .should((text) => {
        expect(text.trim()).to.equal("Settings")
      })
  })

  it("Checks settings view has dark mode & sound toggle", () => {
    cy.fixture("settings").then(({ preferences }) => {
      preferences.forEach(({ selector, label }) => {
        cy.get(`[data-cy="${selector}"]`)
          .should("be.visible")
          .as("option")

        cy.get("@option")
          .find("[data-cy=\"label\"]")
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.equal(label)
          })

        cy.get("@option")
          .find("[data-cy=\"switch\"]")
          .find("input[type=\"checkbox\"]")
          .should("exist")
      })
    })
  })

  it("Checks dark mode toggle", () => {
    // Initial check
    cy.getDarkModeToggle()
    cy.get("@darkModeInput").should("not.be.checked")

    // Toggle ON
    cy.get("@darkModeToggle").click()
    cy.get("@darkModeInput").should("be.checked")
    cy.get("html").should("have.class", "dark")

    // Check localStorage
    cy.window()
      .its("localStorage")
      .invoke("getItem", "preference")
      .then((data) => JSON.parse(data ?? "{}"))
      .its("darkMode")
      .should("equal", true)

    // Reload and re-verify
    cy.reload()
    cy.get("html").should("have.class", "dark")
    cy.get("button").contains("Settings").click()
    
    // Re-alias after reload
    cy.getDarkModeToggle()
    cy.get("@darkModeInput").should("be.checked")
    
    // Toggle OFF
    cy.get("@darkModeToggle").click()
    cy.get("@darkModeInput").should("not.be.checked")
    cy.get("html").should("not.have.class", "dark")

    // Reload again
    cy.reload()
    cy.get("html").should("not.have.class", "dark")

    // Check localStorage is false
    cy.window()
      .its("localStorage")
      .invoke("getItem", "preference")
      .then((data) => JSON.parse(data ?? "{}"))
      .its("darkMode")
      .should("equal", false)
  })
})
