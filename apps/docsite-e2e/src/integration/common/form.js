/// <reference types="cypress" />

const { When } = require('cypress-cucumber-preprocessor/steps');
const { getConstant } = require('../../support/constants');

When('I fill the input {string} with {string}', (constantName, text) => {
  cy.get(getConstant(constantName)).type(text);
});

When('I submit the {string} form', (constantName) => {
  cy.get(getConstant(constantName)).submit();
});
