import { FormSteps, FormSchema } from '@bedrockstreaming/form-builder';

export const makeSchema = (extraValidationList: string[]): FormSchema => ({
  fields: {
    extraValidationList: {
      id: 'extraValidationList',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'extraValidation stringified object',
        name: 'extraValidationList',
        multiline: true,
      },
    },
    validationType: {
      id: 'validationType',
      type: 'select',
      meta: {
        errorMessage: 'Invalid',
        label: 'extra validation type',
        name: 'validationType',
        multiple: true,
      },
    },
    validationValue: {
      id: 'validationValue',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'extra validation value',
        name: 'validationValue',
      },
    },
    validationErrorMessage: {
      id: 'validationErrorMessage',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'extra validation error message',
        name: 'validationErrorMessage',
      },
    },
  },
  steps: {
    'step-0': {
      fieldsById: ['extraValidationList'],
      id: 'step-0',
      submit: {
        label: 'Next',
      },
    },
    ...extraValidationList.reduce(
      (acc, current, index) => ({
        ...acc,
        [`step-${index + 1}`]: {
          id: `step-${index + 1}`,
          fieldsById: ['validationType', 'validationValue', 'validationErrorMessage'],
          submit: {
            label: `Configure ${current} extraValidation`,
          },
        },
      }),
      {} as FormSteps,
    ),
  },
  stepsById: ['step-0', ...extraValidationList.map((_, index) => `step-${index + 1}`)],
});
