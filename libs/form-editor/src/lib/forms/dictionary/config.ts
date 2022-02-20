import { FormSchema } from '@bedrockstreaming/form-builder';

export const schema: FormSchema = {
  fields: {
    dictionary: {
      id: 'dictionary',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'Dictionary object',
        name: 'dictionary',
        multiline: true,
      },
    },
  },
  steps: {
    'step-0': {
      fieldsById: ['dictionary'],
      id: 'step-0',
      submit: {
        label: 'Upload dictionary',
      },
    },
  },
  stepsById: ['step-0'],
};
