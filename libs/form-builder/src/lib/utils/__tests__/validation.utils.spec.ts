import { getFieldRules, handleValidateErrorMessage } from '../validation.utils';

describe('handleValidateErrorMessage', () => {
  const validate = jest.fn();
  const message = 'error label';

  it('should return validate result if truthy', async () => {
    validate.mockResolvedValue(true);
    await expect(
      handleValidateErrorMessage(validate, message)()
    ).resolves.toEqual(true);
  });

  it('should return the message if falsy', async () => {
    validate.mockResolvedValue(false);
    await expect(
      handleValidateErrorMessage(validate, message)()
    ).resolves.toEqual('error label');
  });
});

describe('getFieldRules', () => {
  describe('extraValidation', () => {
    const extraValidation = {
      func1: jest.fn(() => () => Promise.resolve(true)),
      func2: jest.fn(() => () => Promise.resolve(false))
    };

    it('should return hook rules when we provide default rule names', () => {
      const validation = {
        func1: { key: 'required', value: true, message: 'required error' },
        func2: { key: 'minLength', value: 8, message: 'minLength error' }
      };

      const resultHook = {
        required: { value: true, message: 'required error' }
      };

      expect(getFieldRules({ validation, extraValidation })).toEqual(
        resultHook
      );
    });

    it('should complete validate if we provide existing extraValidation', async () => {
      const validation = {
        func1: { key: 'func1', value: '12', message: 'error label' },
        func2: { key: 'func2', value: '12', message: 'error label' }
      };

      const rules = getFieldRules({ validation, extraValidation });
      expect(rules.validate).toEqual({
        func1: expect.any(Function),
        func2: expect.any(Function)
      });
      await expect(rules?.validate?.func1()).resolves.toEqual(true);
      await expect(rules?.validate?.func2()).resolves.toBe('error label');
    });

    it('should not complete validate if we provide missing extraValidation function', () => {
      const validation = {
        func1: { key: 'func1', value: '', message: 'func1 error' },
        badFunc: { key: 'badFunc', value: '', message: 'badFunc error' }
      };

      const rules = getFieldRules({ validation, extraValidation });

      expect(JSON.stringify(rules.validate)).toEqual(
        JSON.stringify({ func1: extraValidation.func1() })
      );
      expect(rules?.validate?.func2).toBeUndefined();
    });
  });
});
