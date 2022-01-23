import { useCallback } from 'react';
import { updateFormData, useFormsDispatch } from '@bedrockstreaming/form-context';

const transformFields = (x) => x;
const formSubmit = (processedFields) => ({
  type: 'some_scope/SUBMIT',
  payload: processedFields
});

export const useSubmit = (formId) => {
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
