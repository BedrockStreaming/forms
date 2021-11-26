import { screen, render, fireEvent } from '@testing-library/react';
import { SubmitField } from '../submitField.component';
import { SUBMIT_FIELD_TYPE } from '../../constants';

let baseProps;
const values = { foo: 'bar' };

const getWrapper = (props) => render(<SubmitField {...props} />);

describe('<FormField />', () => {
  beforeEach(() => {
    baseProps = {
      dictionary: {
        [SUBMIT_FIELD_TYPE]: ({ id, label, onClick }) => (
          <button type="submit" onClick={onClick} id={id}>
            {label}
          </button>
        )
      },
      isDirty: false,
      isValid: true,
      isPreFilled: false,
      getValues: jest.fn().mockImplementation(() => values),
      isLastStep: true,
      isFormStepValid: true,
      submitLabel: 'Click',
      onNextStep: jest.fn()
    };
  });

  describe('when on last step', () => {
    it('should render correctly the submit field', () => {
      getWrapper(baseProps);
      expect(screen.getByRole('button').id).toEqual('submit-field');
    });

    it('should not call onNextStep with form values on click', () => {
      getWrapper(baseProps);
      fireEvent.click(screen.getByRole('button'));
      expect(baseProps.onNextStep).not.toBeCalledWith(values);
    });
  });

  describe('when not on last step', () => {
    it('should render correctly the next field', () => {
      getWrapper({ ...baseProps, isLastStep: false });
      expect(screen.getByRole('button').id).toEqual('next-field');
    });

    it('should call onNextStep with form values on click', () => {
      getWrapper({ ...baseProps, isLastStep: false });
      fireEvent.click(screen.getByRole('button'));
      expect(baseProps.onNextStep).toBeCalledWith(values);
    });
  });
});
