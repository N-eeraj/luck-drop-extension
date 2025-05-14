describe("Views Test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"))
  })
  it("Checks if default view is menu", () => {
    cy.get("[data-cy=\"menu-view\"]").should("exist")
  })
  it("Checks for the header text & icon", () => {
    cy.get("header h1")
      .should("be.visible")
      .invoke("text")
        .then((text) => {
          cy.fixture("menu")
            .then(({ title }) => expect(text.trim()).to.equal(title))
        })
    cy.get("header img")
      .should("exist")
      .and("be.visible")
  })
  it("Checks for all the buttons in the menu", () => {
    cy.fixture("menu").then(({ menuButtons }) => {
      menuButtons.forEach(({ text }) => {
        cy.get(`[data-cy="${text}-button"]`)
          .should("be.visible")
          .should("have.prop", "tagName", "BUTTON")
          .should("not.be.disabled")
          .should("have.text", text)
      })
    })
  })
  it("Check navigation of menu buttons & back via home button", () => {
    cy.fixture("menu").then(({ menuButtons }) => {
      menuButtons.forEach(({ text, view }) => {
        cy.get(`[data-cy="${text}-button"]`)
          .click().then(() => {
            cy.get(`[data-cy="${view}"]`).should("exist")
            cy.get(`[data-cy="home-button"]`)
              .should("be.visible")
              .should("have.prop", "tagName", "BUTTON")
              .should("not.be.disabled")
              .click()
            cy.get('[data-cy="menu-view"]').should("exist")
          })
      })
    })
  })
})
