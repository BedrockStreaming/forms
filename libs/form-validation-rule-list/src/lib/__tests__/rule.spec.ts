import { rule, checkRules } from '../rule';
import { COMPLETE_STATE, INCOMPLETE_STATE, DEFAULT_STATE } from '../constants';

describe('rule', () => {
  const checkAlwaysFalsy = () => false;
  const checkAlwaysTruthy = () => true;

  describe('rule()', () => {
    it('should return a rule object', () => {
      expect(rule('foo', checkAlwaysFalsy)).toMatchObject({
        key: 'foo',
        check: expect.any(Function)
      });
    });

    it('should return a check function that returns 0 on undefined input', () => {
      const { check } = rule('foo', checkAlwaysFalsy);
      expect(check(undefined)).toBe(DEFAULT_STATE);
    });

    it('should return a check function that returns 0 on empty input', () => {
      const { check } = rule('foo', checkAlwaysFalsy);
      expect(check('')).toBe(DEFAULT_STATE);
    });

    it('should return a check function that returns 0 on missing check parameter', () => {
      const { check } = rule('foo');
      expect(check('foo')).toBe(DEFAULT_STATE);
    });

    it('should return a check function that returns 2 when check parameter function returns false', () => {
      const { check } = rule('foo', checkAlwaysFalsy);
      expect(check('foo')).toBe(INCOMPLETE_STATE);
    });

    it('should return a check function that returns 1 when check parameter function returns true', () => {
      const { check } = rule('foo', checkAlwaysTruthy);
      expect(check('foo')).toBe(COMPLETE_STATE);
    });
  });

  describe('checkRules()', () => {
    it('should return a list of incomplete rules keys', () => {
      expect(
        checkRules('yolo', [
          rule('foo', checkAlwaysFalsy),
          rule('bar', checkAlwaysTruthy)
        ])
      ).toEqual(['foo']);
    });

    it('should return no rules keys when value is empty', () => {
      expect(
        checkRules('', [
          rule('foo', checkAlwaysFalsy),
          rule('bar', checkAlwaysTruthy)
        ])
      ).toEqual([]);
    });
  });
});
