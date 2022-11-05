import { renderHook } from '@testing-library/react';
import { useAutoFocus, UseAutoFocusArgs } from '../useAutoFocus.hook';
import { CORRECT_SCHEMA, fieldOneId } from '../../__tests__/fixtures';
import { FieldValues, UseFormSetFocus } from 'react-hook-form';

describe('useAutoFocus', () => {
  let params: UseAutoFocusArgs;

  beforeEach(() => {
    params = {
      schema: CORRECT_SCHEMA,
      setFocus: jest.fn() as jest.MockedFunction<UseFormSetFocus<FieldValues>>,
      currentStepIndex: 0,
    };
  });
  it('should set focus on first field', () => {
    renderHook(() => useAutoFocus(params));

    expect(params.setFocus).toBeCalledWith(fieldOneId);
  });

  it('should not set focus on error', () => {
    renderHook(() =>
      useAutoFocus({
        ...params,
        setFocus: jest.fn().mockImplementation(() => {
          throw new Error('error');
        }),
      }),
    );

    expect(params.setFocus).not.toBeCalledWith(fieldOneId);
  });
});
