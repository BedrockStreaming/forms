import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FieldValues } from 'react-hook-form';
import { updateFormData } from '@bedrockstreaming/form-redux';

export const useSubmit = (
  formId: string,
  onSubmit: (payload: FieldValues) => { type: string; payload: any },
  onExit?: { type: string; payload: any },
) => {
  const dispatch = useDispatch();

  const callback = useCallback(
    async (fieldsValues: FieldValues) => {
      dispatch(updateFormData(formId, fieldsValues));

      return dispatch(onSubmit(fieldsValues));
    },
    [dispatch, formId, onSubmit],
  );

  const cleanCallback = useCallback(() => onExit && dispatch(onExit), [dispatch, onExit]);

  return [callback, cleanCallback];
};
