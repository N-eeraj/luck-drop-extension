describe("App Test", () => {
  it("Checks if default view is menu", () => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.get('[data-cy="menu-view"]').should("exist")
  })
  it("Checks for the header text & icon", () => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.get("header h1")
      .should("be.visible")
      .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal("Luck Drop")
        })
    cy.get("header img")
      .should("exist")
      .and("be.visible")
  })
  it("Checks for all the buttons in the menu", () => {
    cy.visit(Cypress.env("BASE_URL"))
    const menuButtons = [
      "Coin Flip",
      "Dice Roll",
      "Settings",
    ]
    menuButtons.forEach(buttonText => {
      cy.get(`[data-cy="${buttonText}-button"]`)
        .should("be.visible")
        .should("have.prop", "tagName", "BUTTON")
        .should("not.be.disabled")
        .should("have.text", buttonText)
    })
  })
})
