describe("Dice Roll Test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"))
    cy.get("button").contains("Dice Roll").click()
  })

  it("Checks the view has correct title & the roll button", () => {
    cy.get("h1")
      .should("be.visible")
      .invoke("text")
      .should((text) => {
        expect(text.trim()).to.equal("Dice Roll")
      })
    cy.get("[data-cy=\"roll-button\"]")
      .should("be.visible")
  })

  it("Clicks the roll button", () => {
    cy.get("[data-cy=\"roll-button\"]").as("rollButton")
    Cypress._.times(10, () => {
      cy.get("@rollButton")
        .click()
          .then(() => {
            cy.get("@rollButton").should("be.disabled")
            cy.get("[data-cy=\"loading-animation\"]").should("be.visible")
            cy.get("[data-cy=\"dice-face-image\"]").should("not.exist")
            cy.wait(1000)
            cy.get("@rollButton").should("not.be.disabled")
            cy.get("[data-cy=\"loading-animation\"]").should("not.exist")
            cy.get("[data-cy=\"dice-face-image\"]")
              .should("be.visible")
              .then((element) => {
                const face = Number(element.attr("alt")?.split("-").slice(-1))
                expect(face).to.not.NaN
                expect(face)
                  .to.greaterThan(0)
                  .and.to.lessThan(7)
                expect(element.attr("src"))
                  .to.match(new RegExp(`${face}\.svg$`))
              })
          })
    })
  })
})