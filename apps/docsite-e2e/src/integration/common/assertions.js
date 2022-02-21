/// <reference types="cypress" />

const { Then, And } = require('cypress-cucumber-preprocessor/steps');
const { getConstant } = require('../../support/constants');

Then('I should see {string}', (constantName) => {
  cy.get(getConstant(constantName)).should('be.visible');
});

Then('I should see {string} in {string}', (text, constantName) => {
  cy.get(getConstant(constantName)).contains(text);
});

Then('I should not see {string}', (constantName) => {
  cy.get(getConstant(constantName)).should('not.be.visible');
});

And('{string} should match our snapshot', (constantName) => {
  const selector = getConstant(constantName);

  cy.get(selector).matchImageSnapshot();
});

Then('{string} should contain {string}', (selectorConstant, content) => {
  const selector = getConstant(selectorConstant);

  cy.get(selector).contains(content);
});
