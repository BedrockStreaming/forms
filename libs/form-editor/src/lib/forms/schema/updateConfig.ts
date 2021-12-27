import {
  Dictionary,
  FormSchema,
  FormStep,
  ExtraValidation,
  FormField
} from '@bedrockstreaming/form-builder';

export const makeStepSchema = ({
  schema,
  step
}: {
  schema: FormSchema;
  step: FormStep;
}): FormSchema => ({
  fields: {
    stepId: {
      id: 'stepId',
      title: 'The stepId',
      type: 'text',
      defaultValue: step.id,
      meta: {
        errorMessage: 'Invalid',
        label: 'the step id',
        name: 'stepId'
      },
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
      type: 'text',
      defaultValue: step.submit.label
    },
    stepFieldsById: {
      id: 'stepFieldsById',
      title: 'stepFieldsById',
      type: 'select',
      defaultValue: step.fieldsById || [],
      meta: {
        errorMessage: 'Invalid',
        label: 'stepFieldsById',
        name: 'stepFieldsById',
        multiple: true,
        choices: Object.keys(schema.fields)
      }
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
        label: 'Update step'
      }
    }
  },
  stepsById: ['add-step-0']
});

export const makeFieldSchema = ({
  schema,
  dictionary,
  extraValidation,
  field
}: {
  schema: FormSchema;
  field: FormField;
  dictionary?: Dictionary;
  extraValidation?: ExtraValidation;
}): FormSchema => ({
  fields: {
    fieldTitle: {
      id: 'fieldTitle',
      title: 'The field title',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'field title',
        name: 'fieldTitle'
      },
      defaultValue: field.title
    },
    fieldType: {
      id: 'fieldType',
      title: 'The dictionary target',
      type: 'select',
      meta: {
        label: 'dictionary target',
        choices: dictionary
          ? Object.keys(dictionary).filter((id) => id !== 'submit')
          : []
      },
      defaultValue: field.type
    },
    fieldId: {
      id: 'fieldId',
      title: 'The field id',
      type: 'text',
      defaultValue: field.id,
      meta: {
        errorMessage: 'Invalid',
        label: 'the field id',
        name: 'fieldId'
      },
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
      type: 'text',
      defaultValue: field.defaultValue
    },
    fieldValidation: {
      id: 'fieldValidation',
      title: 'Field validation',
      type: 'select',
      defaultValue: Object.keys(field.validation || {}) || [],
      meta: {
        errorMessage: 'Invalid',
        label: 'the field validation',
        name: 'fieldValidation',
        multiple: true,
        choices: [
          'min',
          'max',
          'required',
          extraValidation && Object.keys(extraValidation)
        ].filter(Boolean)
      }
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
    'add-field-0': {
      fieldsById: [
        'fieldId',
        'fieldTitle',
        'fieldType',
        'fieldValidation',
        'fieldDefaultValue',
        'stepId',
        'positionInStep'
      ],
      id: 'add-field-0',
      submit: {
        label: 'Update field'
      }
    }
  },
  stepsById: ['add-field-0']
});
