import { act, render, screen } from '@testing-library/react';
import { FormBuilder } from '../formBuilder';

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
  let wrapper;
  const getWrapper = async (props) => {
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

  const CORRECT_SCHEMA = {
    fields: {
      [fieldOneId]: {
        id: fieldOneId,
        meta: { label: 'bar' },
        type: 'text'
      },
      [fieldTwoId]: {
        id: fieldTwoId,
        meta: { label: 'foo', validation: { required: true, maxLength: 20 } },
        type: 'checkbox'
      },
      [fieldThreeId]: {
        id: fieldThreeId,
        meta: { label: 'baz' },
        type: 'text'
      }
    },
    steps: { ...stepOne, ...stepTwo },
    stepsById: [stepOneId, stepTwoId]
  };
  // aria-checked="true"
  const CORRECT_DICTIONARY = {
    text: ({ label, ...props }) => (
      <fieldset>
        <label>{label}</label>
        <input type="text" placeholder="Test" />
      </fieldset>
    ),
    checkbox: ({ label, value = false, ...props }) => (
      <fieldset>
        <label>{label}</label>
        <input type="checkbox" aria-checked={!!value} />
      </fieldset>
    ),
    submit: ({ label }) => <button type="submit">{label}</button>
  };

  describe('with bad props', () => {
    it('should not render if we pass no dictionary', async () => {
      await getWrapper({
        schema: CORRECT_SCHEMA,
        onSubmit
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass no schema', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        onSubmit
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass no onSubmit', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        schema: CORRECT_SCHEMA
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render if we pass an onSubmit value other than a function', async () => {
      await getWrapper({
        dictionary: CORRECT_DICTIONARY,
        schema: CORRECT_SCHEMA,
        onSubmit: { great: 'right' }
      });

      return expect(screen.queryByRole('form')).toBeNull();
    });

    it('should not render anything if we pass an empty schema or dictionary', async () => {
      const schema = {
        fields: {},
        steps: {},
        stepsById: []
      };
      const dictionary = {};

      await getWrapper({ schema, dictionary, onSubmit });

      return expect(screen.queryByRole('form')).toBeNull();
    });
  });
});
