/// <reference types="cypress" />

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { getConstant } from '../../support/constants';

When('I reload the page', () => {
  cy.reload();
});

Given('I am on the {string} page', (constantName) => {
  const pageUrl = getConstant(constantName);

  cy.visit(pageUrl);
});

Then('I should be on the {string} page', (constantName) => {
  const pageUrl = getConstant(constantName);

  cy.url().should('include', pageUrl);
});

When('I click on {string}', (constantName) => {
  const selector = getConstant(constantName);

  cy.get(selector).click();
});

When('I click on {string} {int} times', (constantName, times) => {
  const selector = getConstant(constantName);

  Array(times)
    .fill()
    .forEach(() => {
      cy.get(selector).click();
    });
});

And('I wait {int} seconds', (n) => cy.wait(n * 1000));
