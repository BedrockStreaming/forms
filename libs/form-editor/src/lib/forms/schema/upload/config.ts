import { FormSchema } from '@bedrockstreaming/form-builder';

export const schema: FormSchema = {
  fields: {
    schema: {
      id: 'schema',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'Copy paste your schema',
        name: 'schema',
        multiline: true,
      },
    },
  },
  steps: {
    'step-0': {
      fieldsById: ['schema'],
      id: 'step-0',
      submit: {
        label: 'Upload existing schema',
      },
    },
  },
  stepsById: ['step-0'],
};
