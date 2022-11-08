import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { getConstant } from '../../support/constants';

Then('I should see {string}', (constantName: string) => {
  cy.get(getConstant(constantName)).should('be.visible');
});

Then('I should see {string} in {string}', (text: string, constantName: string) => {
  cy.get(getConstant(constantName)).contains(text);
});

Then('I should not see {string}', (constantName: string) => {
  cy.get(getConstant(constantName)).should('not.be.visible');
});

Then('{string} should contain {string}', (selectorConstant: string, content: string) => {
  const selector = getConstant(selectorConstant);

  cy.get(selector).contains(content);
});
