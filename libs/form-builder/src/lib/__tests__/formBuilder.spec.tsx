import { act, render, screen } from '@testing-library/react';
import { FormBuilder, FormBuilderProps } from '../formBuilder';
import { FormSchema } from '../types';
import { FormBuilderError } from '../utils/formBuilderError.utils';

const makeStep = ({ fieldsById, stepId, label }: { fieldsById: string[]; stepId: string; label: string }) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label,
    },
  },
});

describe('<FormBuilder />', () => {
  const getWrapper = async (props: FormBuilderProps) => {
    await act(async () => {
      await render(<FormBuilder {...props} />);
    });
  };

  const onSubmit = jest.fn();

  const formId = 'formId';
  const fieldOneId = '1';
  const fieldTwoId = '2';
  const fieldThreeId = '3';

  const stepOneId = 'step-1';
  const stepTwoId = 'step-2';

  const stepOne = makeStep({
    fieldsById: [fieldOneId, fieldTwoId],
    label: 'stepOne',
    stepId: stepOneId,
  });
  const stepTwo = makeStep({
    fieldsById: [fieldThreeId],
    label: 'stepTwo',
    stepId: stepTwoId,
  });

  const CORRECT_SCHEMA: FormSchema = {
    fields: {
      [fieldOneId]: {
        id: fieldOneId,
        meta: { label: 'bar' },
        type: 'text',
      },
      [fieldTwoId]: {
        id: fieldTwoId,
        meta: { label: 'foo', validation: { required: true, maxLength: 20 } },
        type: 'checkbox',
      },
      [fieldThreeId]: {
        id: fieldThreeId,
        meta: { label: 'baz' },
        type: 'text',
      },
    },
    steps: { ...stepOne, ...stepTwo },
    stepsById: [stepOneId, stepTwoId],
  };
  // aria-checked="true"
  const CORRECT_DICTIONARY = {
    text: ({ label }: { label: string }) => (
      <fieldset>
        <label>{label}</label>
        <input type="text" placeholder="Test" />
      </fieldset>
    ),
    checkbox: ({ label, value = false }: { label: string; value?: boolean }) => (
      <fieldset>
        <label>{label}</label>
        <input type="checkbox" aria-checked={!!value} />
      </fieldset>
    ),
    submit: ({ label }: { label: string }) => <button type="submit">{label}</button>,
  };

  describe('with good props', () => {
    it('should render the first step of the form', async () => {
      await getWrapper({
        formId,
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
        currentStepIndex: 0,
      });

      expect(screen.getByRole('form').children).toHaveLength(3);
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(stepOne[stepOneId].submit.label);
    });

    it('should render the second step of the form', async () => {
      await getWrapper({
        formId,
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
        currentStepIndex: 1,
      });

      expect(screen.getByRole('form').children).toHaveLength(2);
      expect(screen.queryByRole('checkbox')).toBeNull();
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(stepTwo[stepTwoId].submit.label);
    });

    it('should render step one if we pass no currentStepIndex', async () => {
      await getWrapper({
        formId,
        schema: CORRECT_SCHEMA,
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
      });

      expect(screen.getByRole('form').children).toHaveLength(3);
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getByRole('button').innerHTML).toBe(stepOne[stepOneId].submit.label);
    });
  });

  describe('with debug', () => {
    it('should throw a FormBuilderError error to the developer if there is an invalid field', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => null);

      const schema = {
        fields: {
          [fieldOneId]: {
            id: fieldOneId,
            type: 'iDontExistInDictionary',
          },
        },
        fieldsById: [fieldOneId],
        steps: { ...stepOne },
        stepsById: [stepOneId],
      };
      // Does not contain the field type 'iDontExistInDictionary'
      const dictionary = {};
      let error;

      try {
        await getWrapper({
          formId,
          schema,
          dictionary,
          onSubmit,
          isLastStep: true,
          debug: true,
        });
      } catch (err) {
        error = err;
        expect(err).toBeInstanceOf(FormBuilderError);
      }
      expect(error).toBeDefined();
      spy.mockRestore();
    });
  });
});
