/// <reference types="cypress"/>

context("Post", () => {
  beforeEach(() => {
    cy.visit("/posts");
  });

  it("should render post skeletons", () => {
    cy.get("h1").contains("Welcome");
  });
});

export {};
