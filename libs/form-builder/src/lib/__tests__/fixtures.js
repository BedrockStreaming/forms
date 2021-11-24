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

const stepOneId = 'step-1';
const stepTwoId = 'step-2';

const stepOne = makeStep({
  fieldsById: [fieldOneId, fieldTwoId],
  label: 'stepOne',
  stepId: stepOneId
});
const stepTwo = makeStep({
  fieldsById: [fieldThreeId],
  label: 'stepTwo',
  stepId: stepTwoId
});

// Fields length is the length of our custom fields + 1 for the submit field which is always here
const stepOneLength = stepOne[stepOneId].fieldsById.length + 1;
const stepTwoLength = stepTwo[stepTwoId].fieldsById.length + 1;

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
      meta: { label: 'foo', validation: { required: true, maxLength: 20 } },
      type: 'checkbox'
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
