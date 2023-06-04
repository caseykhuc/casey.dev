describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('a[href="/blog"]').click();

    cy.url().should("include", "/blog");

    cy.get("h2").contains("Unicode");
  });
});
