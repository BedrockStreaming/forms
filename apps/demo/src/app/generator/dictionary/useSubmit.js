import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormData } from '@bedrockstreaming/form-redux';
import { addDictionary } from '../generator.actions';

const onExit = () => ({ type: 'some_scope/EXIT' });

export const useSubmit = (formId) => {
  const dispatch = useDispatch();

  const callback = useCallback(
    async (fieldsValues) => {
      dispatch(updateFormData(formId, fieldsValues));

      return dispatch(addDictionary(fieldsValues.dictionary));
    },
    [dispatch, formId]
  );

  const cleanCallback = useCallback(() => dispatch(onExit()), [dispatch]);

  return [callback, cleanCallback];
};
