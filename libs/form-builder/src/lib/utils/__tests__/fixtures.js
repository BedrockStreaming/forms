import _ from 'lodash';

const makeStep = ({ fieldsById, stepId, label }) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label
    }
  }
});

const fieldOneId = '1';
const fieldTwoId = '2';
const fieldThreeId = '3';

export const stepOneId = 'step-1';
export const stepTwoId = 'step-2';

export const stepOne = makeStep({
  fieldsById: [fieldOneId, fieldTwoId],
  label: 'stepOne',
  stepId: stepOneId
});
export const stepTwo = makeStep({
  fieldsById: [fieldThreeId],
  label: 'stepTwo',
  stepId: stepTwoId
});

export const CORRECT_SCHEMA = {
  fields: {
    [fieldOneId]: {
      id: fieldOneId,
      title: 'Input text 1',
      meta: { label: 'bar' },
      type: 'text'
    },
    [fieldTwoId]: {
      id: fieldTwoId,
      title: 'Input Checkbox 2',
      meta: { label: 'foo' },
      type: 'checkbox',
      validation: { required: true, maxLength: 20 }
    },
    [fieldThreeId]: {
      id: fieldThreeId,
      title: 'Input text 3',
      meta: { label: 'baz' },
      type: 'text'
    }
  },
  fieldsById: [fieldOneId, fieldTwoId, fieldThreeId],
  steps: { ...stepOne, ...stepTwo },
  stepsById: [stepOneId, stepTwoId]
};

export const CORRECT_DICTIONARY = {
  text: () => <input type="text" placeholder="Test" data-testid="test" />,
  checkbox: () => <input type="checkbox" data-testid="test" />,
  submit: ({ label }) => (
    <button type="submit" data-testid="test">
      {label}
    </button>
  )
};

export const typesAllowed = _.keys(CORRECT_DICTIONARY);
