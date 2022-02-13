/// <reference types="cypress" />

import { When } from 'cypress-cucumber-preprocessor/steps';
import { getConstant } from '../../support/constants';

When('I fill the input {string} with {string}', (constantName, text) => {
  cy.get(getConstant(constantName)).type(text);
});

When('I submit the {string} form', constantName => {
  cy.get(getConstant(constantName)).submit();
});
