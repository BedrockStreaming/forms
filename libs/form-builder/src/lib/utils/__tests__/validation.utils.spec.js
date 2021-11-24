import { rule } from '../rule.utils';
import { getFieldRules, getValidationRulesHints } from '../validation.utils';

jest.mock('../rule.utils');

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

  describe('getValidationRulesHints', () => {
    const validation = {
      foo: {
        key: 'foo',
        message: 'foo message'
      },
      bar: {
        key: 'bar',
        message: 'bar message'
      },
      required: {
        key: 'required',
        message: 'required message'
      }
    };

    const config = {};

    const t = jest.fn().mockImplementation((x) => x);

    rule.mockImplementation((x, y) => ({
      key: x,
      check: y
    }));

    beforeEach(() => {
      t.mockClear();
      rule.mockClear();
    });

    it('should pick the custom rules only', () => {
      expect(getValidationRulesHints({ t, validation })).toEqual([
        { check: expect.any(Function), key: validation.foo.message },
        { check: expect.any(Function), key: validation.bar.message }
      ]);
    });

    it('should assign a callback that evaluates to false when key is found in errors types', () => {
      const result = getValidationRulesHints({
        t,
        validation,
        errors: { types: { foo: true } }
      });
      expect(result[0].check()).toBeFalsy();
      expect(result[1].check()).toBeTruthy();
    });

    it('should translate the message of each rule', () => {
      getValidationRulesHints({ t, validation, config });
      expect(t).toBeCalledWith(validation.foo.message, config);
      expect(t).toBeCalledWith(validation.bar.message, config);
    });
  });
});
