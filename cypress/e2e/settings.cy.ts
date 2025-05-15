describe("Settings Test", () => {
  let preferences

  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.fixture("settings").then((data) => {
      preferences = data.preferences
    })
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

  it("Checks dark mode toggle", () => {
    const darkStateParams = preferences.find(({ label }) => label === "Dark Mode")

    // Initial check
    cy.checkPreferenceState(false, darkStateParams)
    cy.get("html").should("not.have.class", "dark")
  
    // Toggle ON
    cy.get("@toggle").click()
    cy.checkPreferenceState(true, darkStateParams)
    cy.get("html").should("have.class", "dark")
  
    // Reload and re-verify
    cy.reload()
    cy.get("button").contains("Settings").click()
    cy.checkPreferenceState(true, darkStateParams)
    cy.get("html").should("have.class", "dark")

    // Toggle OFF
    cy.get("@toggle").click()
    cy.checkPreferenceState(false, darkStateParams)
    cy.get("html").should("not.have.class", "dark")
  
    // Reload again
    cy.reload()
    cy.get("button").contains("Settings").click()
    cy.checkPreferenceState(false, darkStateParams)
    cy.get("html").should("not.have.class", "dark")
  })

  it("Checks sound toggle", () => {
    const soundStateParams = preferences.find(({ label }) => label === "Sound")

    // Initial check
    cy.checkPreferenceState(true, soundStateParams)
  
    // Toggle OFF
    cy.get("@toggle").click()
    cy.checkPreferenceState(false, soundStateParams)
  
    // Reload and re-verify
    cy.reload()
    cy.get("button").contains("Settings").click()
    cy.checkPreferenceState(false, soundStateParams)

    // Toggle ON
    cy.get("@toggle").click()
    cy.checkPreferenceState(true, soundStateParams)
  
    // Reload again
    cy.reload()
    cy.get("button").contains("Settings").click()
    cy.checkPreferenceState(true, soundStateParams)
  })
})
