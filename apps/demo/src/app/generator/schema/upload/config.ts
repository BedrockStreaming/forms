export const schema = {
  fields: {
    dictionary: {
      id: 'dictionary',
      title: 'The form dictionary',
      type: 'text',
      meta: {
        errorMessage: 'Invalid',
        label: 'Component dictionary key',
        name: 'dictionary',
        multiline: true
      }
    }
  },
  steps: {
    'step-0': {
      fieldsById: ['dictionary'],
      id: 'step-0',
      submit: {
        label: 'Add component to dictionary'
      }
    }
  },
  stepsById: ['step-0']
};
