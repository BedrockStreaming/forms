import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FieldValues } from 'react-hook-form';
import { updateFormData } from '@bedrockstreaming/form-redux';

const transformFields = (x: any) => x;
const formSubmit = (processedFields: any) => ({
  type: 'some_scope/SUBMIT',
  payload: processedFields,
});
const onExit = () => ({ type: 'some_scope/EXIT' });

type UseSubmitReturn = Array<((fieldsValues: FieldValues) => void) | (() => void)>;

export const useSubmit = (formId: string): UseSubmitReturn => {
  const dispatch = useDispatch();

  const callback = useCallback(
    async (fieldsValues: FieldValues) => {
      dispatch(updateFormData(formId, fieldsValues));

      const processedFields = transformFields(fieldsValues);

      return dispatch(formSubmit(processedFields));
    },
    [dispatch, formId],
  );

  const cleanCallback = useCallback(() => dispatch(onExit()), [dispatch]);

  return [callback, cleanCallback];
};
