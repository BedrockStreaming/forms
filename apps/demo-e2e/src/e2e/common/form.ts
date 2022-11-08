import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getConstant } from '../../support/constants';

When('I fill the input {string} with {string}', (constantName: string, text: string) => {
  cy.get(getConstant(constantName)).type(text);
});

When('I submit the {string} form', (constantName: string) => {
  cy.get(getConstant(constantName)).submit();
});
