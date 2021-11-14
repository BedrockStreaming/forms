import * as React from 'react';
import {
  useForm,
  Controller,
  ValidationMode,
  DefaultValues,
  Path,
  SubmitHandler,
  UnpackNestedValue
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import _ from 'lodash';

import { Dictionary, ExtraValidation, FormSchema } from './types';
import { useCheckFormStepValidity } from './hooks/useCheckFormStepValidity.hook';

import { getSchemaInfo } from './utils/getSchemaInfo.util';
import { handleFormBuilderError } from './utils/handleFormBuilderError.util';

import { Stepper } from './components/stepper.component';
import { FormField } from './components/formField.component';
import { SubmitField } from './components/submitField.component';
import { getFieldRules } from './utils/validation.utils';
import { useAutoFocus } from './hooks/useAutoFocus';

const { DEBUG } = process.env;

export interface FormBuilderProps<FormValues> {
  defaultValues?: DefaultValues<FormValues>;
  behavior: keyof ValidationMode;
  schema: FormSchema;
  dictionary: Dictionary;
  onNextStep: (value: UnpackNestedValue<FormValues>) => void;
  onSubmit: SubmitHandler<FormValues>;
  extraValidation?: ExtraValidation;
  isLastStep: boolean;
  currentStepIndex: number;
}

export function FormBuilder<FormValues>(props: FormBuilderProps<FormValues>) {
  const {
    defaultValues,
    behavior,
    schema,
    dictionary,
    onNextStep,
    onSubmit,
    extraValidation,
    isLastStep,
    currentStepIndex
  } = props;

  const {
    handleSubmit,
    formState: { isDirty, isValid, errors, dirtyFields },
    control,
    getValues,
    setValue,
    trigger,
    watch,
    setFocus
  } = useForm<FormValues>({
    mode: behavior,
    criteriaMode: 'all',
    defaultValues
  });

  const isPreFilled = !_.isEmpty(defaultValues);

  const typesAllowed = _.keys(dictionary);

  const { fields, fieldsById, stepsById, submitLabel } = React.useMemo(
    () => getSchemaInfo(schema, typesAllowed, currentStepIndex),
    [currentStepIndex, schema, typesAllowed]
  );

  const setFieldValue = React.useCallback(
    (id: Path<FormValues>, value) =>
      setValue(id, value, { shouldValidate: true, shouldDirty: true }),
    [setValue]
  );

  const triggerValidationField = React.useCallback(trigger, [trigger]);

  const isFormStepValid = useCheckFormStepValidity<FormValues>({
    schema,
    currentStepIndex,
    dirtyFields,
    defaultValues,
    watch,
    trigger
  });

  useAutoFocus({ currentStepIndex, schema, setFocus });

  // Displays nice and informative errors in dev mode
  if (DEBUG) handleFormBuilderError(typesAllowed, schema, dictionary);

  if (_.isEmpty(schema) || _.isEmpty(dictionary)) return null;

  return (
    <>
      <form data-testid="form-builder" onSubmit={handleSubmit(onSubmit)}>
        <Stepper currentStepIndex={currentStepIndex}>
          {_.map(stepsById, (stepId) => (
            <React.Fragment key={stepId}>
              {_.map(fieldsById, (fieldId) => {
                const { type, id, defaultValue, meta, validation } =
                  fields[fieldId];

                const validationRules = getFieldRules({
                  validation,
                  extraValidation
                });

                return (
                  <Controller
                    key={id}
                    name={id}
                    control={control}
                    defaultValue={defaultValue}
                    rules={validationRules}
                    render={({ field }) => (
                      <FormField
                        id={id}
                        fieldType={type}
                        validation={validation}
                        dictionary={dictionary}
                        errors={_.get(errors, [id])}
                        setFieldValue={setFieldValue}
                        triggerValidationField={triggerValidationField}
                        {..._.omit(field, 'ref')}
                        propRef={field.ref}
                        {...meta}
                      />
                    )}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </Stepper>
        <SubmitField<FormValues>
          dictionary={dictionary}
          isDirty={isDirty}
          isValid={isValid}
          isPreFilled={isPreFilled}
          isLastStep={isLastStep}
          isFormStepValid={isFormStepValid}
          submitLabel={submitLabel}
          getValues={getValues}
          onNextStep={onNextStep}
        />
      </form>
      {DEBUG && <DevTool control={control} />}
    </>
  );
}
