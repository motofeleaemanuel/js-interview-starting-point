describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("should display the heading", () => {
    cy.contains("h1", "Project ready!").should("be.visible")
  })

  it("should display the button component", () => {
    cy.get("button").contains("Button").should("be.visible")
  })

  it("should show dark mode toggle instructions", () => {
    cy.contains("Press").should("be.visible")
    cy.get("kbd").contains("d").should("exist")
  })
})
