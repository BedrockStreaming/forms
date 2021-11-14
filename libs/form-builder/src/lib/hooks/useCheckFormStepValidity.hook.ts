import { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  DefaultValues,
  Path,
  UseFormTrigger,
  UseFormWatch
} from 'react-hook-form';

import { FormSchema } from '../types';

interface GetFieldsToCheckByStepArgs {
  schema: FormSchema;
  currentStepIndex: number;
}

export const getFieldsToCheckByStep = ({
  schema,
  currentStepIndex
}: GetFieldsToCheckByStepArgs) => {
  const currentStepId = _.get(schema, `stepsById.${currentStepIndex}`);
  const currentStepFieldIds = _.get(
    schema,
    `steps.${currentStepId}.fieldsById`
  );

  const fieldsToCheck = _.filter(
    currentStepFieldIds,
    (fieldId) => !_.get(schema, `fields.${fieldId}.meta.static`)
  );

  return fieldsToCheck;
};

type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

interface UpdateValidityArgs<FormValues> {
  dirtyFields: UnknownArrayOrObject | boolean;
  fieldsToCheck: Path<FormValues>[];
  defaultValues?: DefaultValues<FormValues>;
  trigger: UseFormTrigger<FormValues>;
  setValidity: (value: boolean) => void;
}

export async function updateValidity<FormValues>({
  dirtyFields,
  fieldsToCheck,
  defaultValues = {} as DefaultValues<FormValues>,
  trigger,
  setValidity
}: UpdateValidityArgs<FormValues>) {
  if (_.isBoolean(dirtyFields)) {
    setValidity(dirtyFields);

    return;
  }
  const dirtyFieldsArray = _.compact(
    Object.keys(dirtyFields).map((key) =>
      _.get(dirtyFields, [key]) ? key : null
    )
  );
  const areAllFieldsDirty =
    _.get(
      _.difference(fieldsToCheck, dirtyFieldsArray, Object.keys(defaultValues)),
      'length'
    ) === 0;
  const updatedValidity = areAllFieldsDirty && (await trigger(fieldsToCheck));

  setValidity(updatedValidity);
}

interface UseCheckFormStepValidityArgs<FormValues> {
  schema: FormSchema;
  dirtyFields: UnknownArrayOrObject | boolean;
  currentStepIndex: number;
  defaultValues?: DefaultValues<FormValues>;
  trigger: UseFormTrigger<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const EMPTY_DEFAULT_VALUES = {} as DefaultValues<any>;

export function useCheckFormStepValidity<FormValues>({
  schema,
  currentStepIndex,
  dirtyFields,
  defaultValues = EMPTY_DEFAULT_VALUES,
  watch,
  trigger
}: UseCheckFormStepValidityArgs<FormValues>) {
  const [validity, setValidity] = useState(false);

  useEffect(() => {
    const fieldsToCheck = getFieldsToCheckByStep({ schema, currentStepIndex });

    updateValidity({
      dirtyFields,
      fieldsToCheck,
      defaultValues,
      trigger,
      setValidity
    });

    const subscription = watch(() =>
      updateValidity({
        dirtyFields,
        fieldsToCheck,
        defaultValues,
        trigger,
        setValidity
      })
    );

    return () => subscription.unsubscribe();
  }, [
    currentStepIndex,
    defaultValues,
    schema,
    watch,
    trigger,
    dirtyFields,
    setValidity
  ]);

  return validity;
}
