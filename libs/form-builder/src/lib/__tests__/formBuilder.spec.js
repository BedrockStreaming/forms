import { act, render } from '@testing-library/react';
import { FormBuilder } from '../formBuilder';
import { FormBuilderError } from '../utils/formBuilderError.utils';

jest.unmock('../formBuilder.tsx');
jest.unmock('../components/formField.component.tsx');
jest.unmock('../components/submitField.component.tsx');
jest.unmock('../components/stepper.component.tsx');
jest.unmock('../utils/handleFormBuilderError.util.ts');
jest.unmock('../utils/getSchemaInfo.util.ts');
jest.unmock('../hooks/useCheckFormStepValidity.hook.ts');
jest.unmock('react-hook-form');

const makeStep = ({ fieldsById, stepId, label }) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label
    }
  }
});

describe('<FormBuilder />', () => {
  const getWrapper = async (props) => {
    return act(() => render(<FormBuilder {...props} />));
  };

  const onSubmit = jest.fn();

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

  const CORRECT_SCHEMA = {
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

  const CORRECT_DICTIONARY = {
    text: () => <input type="text" placeholder="Test" data-testid="test" />,
    checkbox: () => <input type="checkbox" data-testid="test" />,
    submit: ({ label }) => (
      <button type="submit" data-testid="test">
        {label}
      </button>
    )
  };

  beforeEach(() => {
    global.__DEBUG_MODE__ = false;
  });

  xit('should throw a FormBuilderError error to the developer if there is an invalid field (when in debug mode)', () => {
    global.__DEBUG_MODE__ = true;
    const schema = {
      fields: {
        [fieldOneId]: {
          id: fieldOneId,
          title: 'an invalid field',
          type: 'iDontExistIndictionary'
        }
      },
      fieldsById: [fieldOneId],
      steps: { ...stepOne },
      stepsById: [stepOneId]
    };
    // Does not contain the field type 'iDontExistIndictionary'
    const dictionary = {};

    return expect(() =>
      getWrapper({ schema, dictionary, onSubmit, isLastStep: true })
    ).toThrowError(FormBuilderError);
  });

  xit('should not render anything if we pass an empty schema or dictionary', () => {
    const schema = {
      fields: {},
      fieldsById: [],
      steps: {},
      stepsById: []
    };
    const dictionary = {};

    return expect(
      getWrapper({ schema, dictionary, onSubmit }).container.firstChild
    ).toBeNull();
  });
});
