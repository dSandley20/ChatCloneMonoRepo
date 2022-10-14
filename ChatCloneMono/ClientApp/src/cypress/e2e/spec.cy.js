/* eslint-disable no-undef */

describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Example Test Creating A User", () => {
  it("Valid Creation Data", () => {
    cy.visit("https://localhost:44458/")
      .get('[data-cy="createUpdateUser"]')
      .click()
      .get('[data-cy="firstNameField"]')
      .type("Jason")
      .get('[data-cy="lastNameField"]')
      .type("Line")
      .get('[data-cy="emailField"]')
      .type("JasonL@gmail.com")
      .get('[data-cy="passwordField"]')
      .type("Password1!")
      .get('[data-cy="submitFormBtn"]')
      .click()
      .wait(2000)
      .get('[data-cy="userAvatar"]')
      .should("have.text", "JL")
      .get('[data-cy="userFName"]')
      .should("have.text", "Jason")
      .get('[data-cy="userLName"]')
      .should("have.text", "Line")
      .get('[data-cy="userEmail"]')
      .should("have.text", "JasonL@gmail.com");
  });

  it("Invalid Creation Data (invalid pw)", () => {
    cy.visit("https://localhost:44458/")
      .get('[data-cy="createUpdateUser"]')
      .click()
      .get('[data-cy="firstNameField"]')
      .type("Jason")
      .get('[data-cy="lastNameField"]')
      .type("Line")
      .get('[data-cy="emailField"]')
      .type("JasonL@gmail.com")
      .get('[data-cy="passwordField"]')
      .type("Password")
      .get('[data-cy="submitFormBtn"]')
      .click()
      .get("#Password-helper-text")
      .contains("Password must match the following:");
  });
});
