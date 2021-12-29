import { act, render, screen } from '@testing-library/react';
import { FormBuilder, FormBuilderProps } from '../formBuilder';
import { FormBuilderError } from '../utils/formBuilderError.utils';

const makeStep = ({
  fieldsById,
  stepId,
  label
}: {
  fieldsById: string[];
  stepId: string;
  label: string;
}) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label
    }
  }
});

describe('<FormBuilder />', () => {
  let wrapper;
  const getWrapper = async (props: FormBuilderProps) => {
    await act(async () => {
      wrapper = await render(<FormBuilder {...props} />);
    });
  };

  afterEach(() => {
    wrapper = null;
  });

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
  // aria-checked="true"
  const CORRECT_DICTIONARY = {
    text: ({ label }: { label: string }) => (
      <fieldset>
        <label>{label}</label>
        <input type="text" placeholder="Test" />
      </fieldset>
    ),
    checkbox: ({
      label,
      value = false
    }: {
      label: string;
      value?: boolean;
    }) => (
      <fieldset>
        <label>{label}</label>
        <input type="checkbox" aria-checked={!!value} />
      </fieldset>
    ),
    submit: ({ label }: { label: string }) => (
      <button type="submit">{label}</button>
    )
  };

  describe('with good props', () => {
    it('should render the first step of the form', async () => {
      await getWrapper({
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
        currentStepIndex: 0
      });

      expect(screen.getByRole('form').children.length).toBe(3);
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(
        stepOne[stepOneId].submit.label
      );
    });

    it('should render the second step of the form', async () => {
      await getWrapper({
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
        currentStepIndex: 1
      });

      expect(screen.getByRole('form').children.length).toBe(2);
      expect(screen.queryByRole('checkbox')).toBeNull();
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(
        stepTwo[stepTwoId].submit.label
      );
    });

    it('should render step one if we pass no currentStepIndex', async () => {
      await getWrapper({
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit
      });

      expect(screen.getByRole('form').children.length).toBe(3);
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(
        stepOne[stepOneId].submit.label
      );
    });
  });

  describe('with debug', () => {
    it('should throw a FormBuilderError error to the developer if there is an invalid field', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => null);

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
      let _error;

      try {
        await getWrapper({
          schema,
          dictionary,
          onSubmit,
          isLastStep: true,
          debug: true
        });
      } catch (error) {
        _error = error;
        expect(error).toBeInstanceOf(FormBuilderError);
      }
      expect(_error).toBeDefined();
      spy.mockRestore();
    });
  });
});
