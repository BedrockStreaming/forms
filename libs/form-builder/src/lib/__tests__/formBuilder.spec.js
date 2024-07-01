/* eslint-disable */
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { FormBuilder } from '../formBuilder';

const makeStep = ({ fieldsById, stepId, label }) => ({
  [stepId]: {
    fieldsById,
    id: stepId,
    submit: {
      label,
    },
  },
});

describe('<FormBuilder />', () => {
  const getWrapper = async (props) => {
    await act(async () => {
      await render(<FormBuilder {...props} />);
    });
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
    stepId: stepOneId,
  });
  const stepTwo = makeStep({
    fieldsById: [fieldThreeId],
    label: 'stepTwo',
    stepId: stepTwoId,
  });

  const CORRECT_SCHEMA = {
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
    text: ({ label, errors, id, ...props }) => (
      <fieldset>
        <label for={id}>{label}</label>
        <input id={id} type="text" placeholder="Test" />
        {
          !!errors ? (
            <span>{errors.message}</span>
          ) : null
        }
      </fieldset>
    ),
    checkbox: ({ label, value = false, ...props }) => (
      <fieldset>
        <label>{label}</label>
        <input type="checkbox" aria-checked={!!value} />
      </fieldset>
    ),
    submit: ({ label }) => <button type="submit">{label}</button>,
  };

  describe('onChangeTriggerByField behavior', () => {
    it.only('should trigger validate only changed field', async () => {
      await getWrapper({
        schema: {
          fields: {
            [fieldOneId]: {
              id: fieldOneId,
              type: 'text',
              meta: {
                label: 'bar',
              },
              validation: {
                required: {
                  key: 'required',
                  message: 'field is required',
                  value: true,
                },
              }
            },
            [fieldTwoId]: {
              id: fieldTwoId,
              type: 'text',
              meta: {
                label: 'foo',
              },
              validation: {
                required: {
                  key: 'required',
                  message: 'field is required',
                  value: true,
                },
              }
            },
          },
          steps: { ...stepOne },
          stepsById: [stepOneId, stepTwoId],
        },
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
      });

      await userEvent.type(screen.getByLabelText('bar'), 'tesTyping');

      expect(screen.queryByText('field is required')).not.toBeInTheDocument();
    })
  })

  describe('with bad props', () => {
    it('should not render if we pass no dictionary', async () => {
      await getWrapper({
        schema: CORRECT_SCHEMA,
        onSubmit,
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass no schema', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        onSubmit,
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass no onSubmit', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        schema: CORRECT_SCHEMA,
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass an onSubmit value other than a function', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        schema: CORRECT_SCHEMA,
        onSubmit: { great: 'right' },
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render anything if we pass an empty schema or dictionary', async () => {
      const schema = {
        fields: {},
        steps: {},
        stepsById: [],
      };
      const dictionary = {};

      await getWrapper({ schema, dictionary, onSubmit });

      return expect(screen.queryByRole('form')).toBeNull();
    });
  });
});
