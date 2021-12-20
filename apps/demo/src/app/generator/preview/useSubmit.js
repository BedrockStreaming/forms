import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormData } from '@bedrockstreaming/form-redux';
import { addStep } from '../generator.actions';

const onExit = () => ({ type: 'some_scope/EXIT' });

export const useSubmit = (formId) => {
  const dispatch = useDispatch();

  const callback = useCallback(
    async (fieldsValues) => {
      console.log('submit values', fieldsValues);
      dispatch(updateFormData(formId, fieldsValues));

      return dispatch({ type: 'generator/PREVIEW' });
    },
    [dispatch, formId]
  );

  const cleanCallback = useCallback(() => dispatch(onExit()), [dispatch]);

  return [callback, cleanCallback];
};
