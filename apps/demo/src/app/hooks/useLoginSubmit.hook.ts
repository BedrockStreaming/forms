import { useCallback } from 'react';
import {
  updateFormData,
  useFormsDispatch
} from '@bedrockstreaming/form-context';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const transformFields = (x: any) => x;
const formSubmit = (processedFields: FieldValues) => ({
  type: 'some_scope/SUBMIT',
  payload: processedFields
});

export const useSubmit = (formId: string): SubmitHandler<FieldValues> => {
  const dispatch = useFormsDispatch();

  const callback = useCallback(
    async (fieldsValues) => {
      dispatch(updateFormData(formId, fieldsValues));

      const processedFields = transformFields(fieldsValues);

      return console.log(formSubmit(processedFields));
    },
    [dispatch, formId]
  );

  return callback;
};
