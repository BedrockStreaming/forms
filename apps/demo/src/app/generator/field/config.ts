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
    fieldTitle: {
      id: 'fieldTitle',
      title: 'The field title',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'field title',
        name: 'fieldTitle'
      }
    },
    fieldType: {
      id: 'fieldType',
      title: 'The dictionary target',
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
      title: 'The field id',
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
      title: 'The field default value',
      type: 'text'
    },
    fieldValidation: {
      id: 'fieldValidation',
      title: 'Field validation',
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
      title: 'The field position in Step',
      type: 'text',
      defaultValue: 0
    },
    stepId: {
      id: 'stepId',
      type: 'select',
      title: 'the stepId the field belongs to',
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
        'fieldTitle',
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
