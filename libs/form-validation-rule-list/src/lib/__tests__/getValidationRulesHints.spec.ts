import { getValidationRulesHints } from '../getValidationRulesHints';
import { rule } from '../rule';

jest.mock('../rule', () => ({ rule: jest.fn() }));

const ruleMock = rule as unknown as jest.Mock;

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

  ruleMock.mockImplementation((x, y) => ({
    key: x,
    check: y
  }));

  beforeEach(() => {
    t.mockClear();
    ruleMock.mockClear();
  });

  it('should pick the custom rules only', () => {
    expect(getValidationRulesHints({ t, validation, errors: {} })).toEqual([
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
    getValidationRulesHints({ t, validation, config, errors: {} });
    expect(t).toBeCalledWith(validation.foo.message, config);
    expect(t).toBeCalledWith(validation.bar.message, config);
  });
});
