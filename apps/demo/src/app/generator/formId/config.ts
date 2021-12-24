export const schema = {
  fields: {
    formId: {
      id: 'formId',
      title: 'The form unique id',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'form ID',
        name: 'formId'
      }
    }
  },
  steps: {
    'step-0': {
      fieldsById: ['formId'],
      id: 'step-0',
      submit: {
        label: 'Add formId'
      }
    }
  },
  stepsById: ['step-0']
};
