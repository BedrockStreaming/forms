import { renderHook } from '@testing-library/react-hooks';
import { useIsFormStepValid } from '../useIsFormStepValid';
import { getFieldsToCheckByStep, isStepInError } from '../../utils/error.util';
import { CORRECT_SCHEMA } from '../../__tests__/fixtures';

jest.mock('../../utils/error.util');

describe('useIsFormStepValid', () => {
  beforeEach(() => {
    (getFieldsToCheckByStep as any).mockReturnValue([]);
    (isStepInError as any).mockReturnValue(true);
  });

  const baseParams = {
    isLastStep: false,
    isValidating: false,
    errors: {},
    dirtyFields: {},
    schema: CORRECT_SCHEMA,
    currentStepIndex: 0
  };

  it('should return false if isValidating is passed to true', () => {
    const { result } = renderHook(() =>
      useIsFormStepValid({
        ...baseParams,
        isValidating: true
      })
    );

    expect(result.current).toBe(false);
    expect(getFieldsToCheckByStep).not.toBeCalled();
    expect(isStepInError).not.toBeCalled();
  });

  it('should return false if isLastStep is passed to true', () => {
    const { result } = renderHook(() =>
      useIsFormStepValid({ ...baseParams, isLastStep: true })
    );
    expect(result.current).toBe(false);
    expect(getFieldsToCheckByStep).not.toBeCalled();
    expect(isStepInError).not.toBeCalled();
  });

  it('should return false if on last step and validating are passed to true', () => {
    const { result } = renderHook(() =>
      useIsFormStepValid({
        ...baseParams,
        isLastStep: true,
        isValidating: true
      })
    );
    expect(result.current).toBe(false);
    expect(getFieldsToCheckByStep).not.toBeCalled();
    expect(isStepInError).not.toBeCalled();
  });

  it('should call getFieldsToCheckByStep and isStepInError if not on last step or validating', () => {
    renderHook(() => useIsFormStepValid(baseParams));
    expect(getFieldsToCheckByStep).toBeCalled();
    expect(isStepInError).toBeCalled();
  });

  it('should call return the opposite value of isStepInError - 1', () => {
    const { result } = renderHook(() => useIsFormStepValid(baseParams));
    expect(result.current).toBe(false);
  });

  it('should call return the opposite value of isStepInError - 2', () => {
    (isStepInError as any).mockReturnValue(false);
    const { result } = renderHook(() => useIsFormStepValid(baseParams));
    expect(result.current).toBe(true);
  });
});
