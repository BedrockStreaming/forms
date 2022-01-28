import {
  Dictionary,
  ExtraValidation,
  FormSchema
} from '@bedrockstreaming/form-builder';

export const makeSchema = ({
  dictionary,
  extraValidation,
  schema
}: {
  schema: FormSchema;
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) => ({
  fields: {
    fieldType: {
      id: 'fieldType',
      type: 'select',
      meta: {
        label: 'dictionary target',
        choices: Object.keys(dictionary).filter((id) => id !== 'submit')
      }
    },
    fieldId: {
      id: 'fieldId',
      meta: {
        errorMessage: 'Invalid',
        label: 'the field id',
        name: 'fieldId'
      },
      type: 'text',
      validation: {
        required: {
          key: 'required',
          message: 'Required field',
          value: true
        }
      }
    },
    fieldDefaultValue: {
      id: 'fieldDefaultValue',
      meta: {
        errorMessage: 'Invalid',
        label: 'the field default value',
        name: 'fieldDefaultValue'
      },
      type: 'text'
    },
    fieldValidation: {
      id: 'fieldValidation',
      type: 'select',
      meta: {
        errorMessage: 'Invalid',
        label: 'the field validation',
        name: 'fieldValidation',
        multiple: true,
        choices: ['min', 'max', 'required', ...Object.keys(extraValidation)]
      },
      defaultValue: []
    },
    positionInStep: {
      id: 'positionInStep',
      meta: {
        errorMessage: 'Invalid',
        label: 'the field index position in Step',
        name: 'positionInStep',
        type: 'number'
      },
      type: 'text',
      defaultValue: 0
    },
    stepId: {
      id: 'stepId',
      type: 'select',
      defaultValue: [],
      validation: {
        required: {
          key: 'required',
          value: true,
          message: 'required field'
        }
      },
      meta: {
        errorMessage: 'Invalid',
        label: 'the stepId the field belongs to',
        name: 'stepId',
        choices: schema.stepsById
      }
    }
  },
  steps: {
    'step-0': {
      fieldsById: [
        'fieldId',
        'fieldType',
        'fieldValidation',
        'fieldDefaultValue',
        'stepId',
        'positionInStep'
      ],
      id: 'step-0',
      submit: {
        label: 'Add field'
      }
    }
  },
  stepsById: ['step-0']
});
