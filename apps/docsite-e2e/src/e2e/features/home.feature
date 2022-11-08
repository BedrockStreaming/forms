Feature: Home page
  I want to make sure the home page works as expected

  Background:
    Given I am on the "home" page

  Scenario: Page elements
    Then I should see "Bedrock Streaming Forms" in "hero title"
    And I should see "get started button"
    And I should see "form example"

  Scenario: Getting started
    When I click on "get started button"
    Then I should be on the "docs" page
