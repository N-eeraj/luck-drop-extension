describe("Coin Flip Test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.get("button").contains("Coin Flip").click()
  })

  it("Checks the view has correct title & the flip button", () => {
    cy.get("h1")
      .should("be.visible")
      .invoke("text")
      .should((text) => {
        expect(text.trim()).to.equal("Coin Flip")
      })
    cy.get("[data-cy=\"flip-button\"]")
      .should("be.visible")
  })

  it("Clicks the flip button", () => {
    cy.get("[data-cy=\"flip-button\"]").as("flipButton")
    Cypress._.times(10, () => {
      cy.get("@flipButton")
        .click()
          .then(() => {
            cy.get("@flipButton").should("be.disabled")
            cy.get("[data-cy=\"loading-animation\"]").should("be.visible")
            cy.get("[data-cy=\"coin-face-image\"]").should("not.exist")
            cy.wait(1000)
            cy.get("@flipButton").should("not.be.disabled")
            cy.get("[data-cy=\"loading-animation\"]").should("not.exist")
            cy.get("[data-cy=\"coin-face-image\"]").should("be.visible")
            cy.get("[data-cy=\"coin-face\"]")
              .should("be.visible")
              .invoke("text")
                .then((text) => {
                  expect([
                    "head",
                    "tail",
                  ]).to.contain(text.trim())
                  cy.get("[data-cy=\"coin-face-image\"]")
                    .should("have.prop", "alt", text.trim())
                })
          })
    })
  })
})