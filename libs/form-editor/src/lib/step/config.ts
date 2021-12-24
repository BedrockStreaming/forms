import { FormFields, FormSchema } from '@bedrockstreaming/form-builder';

export const makeSchema = ({
  fields,
  schema
}: {
  fields: FormFields;
  schema: FormSchema;
}) => ({
  fields: {
    stepId: {
      id: 'stepId',
      meta: {
        errorMessage: 'Invalid',
        label: 'the step id',
        name: 'stepId'
      },
      title: 'The stepId',
      type: 'text',
      validation: {
        required: {
          key: 'required',
          message: 'Required field',
          value: true
        }
      }
    },
    stepSubmitLabel: {
      id: 'stepSubmitLabel',
      meta: {
        errorMessage: 'Invalid',
        label: 'the step submit label',
        name: 'stepSubmitLabel'
      },
      title: 'The step submit label',
      type: 'text'
    },
    stepFieldsById: {
      id: 'stepFieldsById',
      title: 'stepFieldsById',
      type: 'select',
      meta: {
        errorMessage: 'Invalid',
        label: 'stepFieldsById',
        name: 'stepFieldsById',
        multiple: true,
        choices: Object.keys(fields)
      },
      defaultValue: []
    },
    stepPosition: {
      id: 'stepPosition',
      title: 'stepPosition',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'stepPosition',
        name: 'stepPosition',
        type: 'number'
      },
      validation: {
        max: {
          message: 'max number exceeded',
          value: schema.stepsById.length,
          key: 'max'
        }
      }
    }
  },
  steps: {
    'add-step-0': {
      fieldsById: [
        'stepId',
        'stepFieldsById',
        'stepSubmitLabel',
        'stepPosition'
      ],
      id: 'add-step-0',
      submit: {
        label: 'Add step'
      }
    }
  },
  stepsById: ['add-step-0']
});
