import { Dictionary } from '../types';
import { FormSchema } from '../types';

const makeStep = ({ fieldsById, stepId, label }: { fieldsById: string[]; stepId: string; label: string }) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label,
    },
  },
});

export const fieldOneId = '1';
export const fieldTwoId = '2';
export const fieldThreeId = '3';

export const stepOneId = 'step-1';
export const stepTwoId = 'step-2';

export const stepOne = makeStep({
  fieldsById: [fieldOneId, fieldTwoId],
  label: 'stepOne',
  stepId: stepOneId,
});
export const stepTwo = makeStep({
  fieldsById: [fieldThreeId],
  label: 'stepTwo',
  stepId: stepTwoId,
});

export const CORRECT_SCHEMA: FormSchema = {
  fields: {
    [fieldOneId]: {
      id: fieldOneId,
      meta: { label: 'bar' },
      type: 'text',
    },
    [fieldTwoId]: {
      id: fieldTwoId,
      meta: { label: 'foo' },
      type: 'checkbox',
      validation: {
        required: {
          key: 'required',
          message: 'forms.required.error',
          value: true,
        },
      },
    },
    [fieldThreeId]: {
      id: fieldThreeId,
      meta: { label: 'baz' },
      type: 'text',
    },
  },
  formMeta: {},
  steps: { ...stepOne, ...stepTwo },
  stepsById: [stepOneId, stepTwoId],
};

export const CORRECT_DICTIONARY: Dictionary = {
  text: () => <input type="text" placeholder="Test" data-testid="test" />,
  checkbox: () => <input type="checkbox" data-testid="test" />,
  submit: ({ label }) => (
    <button type="submit" data-testid="test">
      {label}
    </button>
  ),
};

export const typesAllowed = Object.keys(CORRECT_DICTIONARY);
