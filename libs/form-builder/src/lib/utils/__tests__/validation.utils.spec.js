import { getFieldRules } from '../validation.utils';

describe('getFieldRules', () => {
  describe('extraValidation', () => {
    const extraValidation = {
      func1: jest.fn(() => () => true),
      func2: jest.fn(() => () => false)
    };

    it('should return hook rules when we provide default rule names', () => {
      const validation = {
        func1: { key: 'required', value: true },
        func2: { key: 'minLength', value: 8 }
      };

      const resultHook = { required: { value: true } };

      expect(getFieldRules({ validation, extraValidation })).toEqual(
        resultHook
      );
    });

    it('should complete validate if we provide existing extraValidation', () => {
      const validation = {
        func1: { key: 'func1' },
        func2: { key: 'func2' }
      };

      const rules = getFieldRules({ validation, extraValidation });
      expect(rules.validate).toEqual({
        func1: expect.any(Function),
        func2: expect.any(Function)
      });
      expect(rules.validate.func1()).toEqual(true);
      expect(rules.validate.func2()).toEqual(false);
    });

    it('should not complete validate if we provide missing extraValidation function', () => {
      const validation = {
        func1: { key: 'func1' },
        badFunc: { key: 'badFunc' }
      };

      const rules = getFieldRules({ validation, extraValidation });

      expect(JSON.stringify(rules.validate)).toEqual(
        JSON.stringify({ func1: extraValidation.func1() })
      );
      expect(rules.validate.func2).toBeUndefined();
    });
  });
});
