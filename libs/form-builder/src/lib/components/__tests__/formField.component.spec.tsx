import { screen, render } from '@testing-library/react';
import { FormField } from '../formField.component';

const id = 'foo';

describe('<FormField />', () => {
  describe('when valid', () => {
    const dictionary = {
      valid_type: () => <h1 data-testid="foo">I am a valid field</h1>,
    };
    const fieldType = 'valid_type';

    it('should render correctly the field valid_type', () => {
      render(<FormField {...{ fieldType, dictionary, id }} />);

      return expect(screen.getByRole('heading').textContent).toEqual('I am a valid field');
    });
  });

  describe('when invalid', () => {
    const dictionary = {
      valid_type: () => <h1>I am a valid field</h1>,
    };
    const fieldType = 'invalid_type';

    it('should not render when field type is missing from dictionnary', () => {
      render(<FormField {...{ fieldType, dictionary, id }} />);

      expect(screen.queryByRole('heading')).toBeNull();
    });
  });
});
