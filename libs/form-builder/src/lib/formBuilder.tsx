import * as React from 'react';
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  ValidationMode
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import _ from 'lodash';

import { Dictionary, ExtraValidation, FormSchema } from './types';
import { useAutoFocus } from './hooks/useAutoFocus.hook';
import { useIsFormStepValid } from './hooks/useIsFormStepValid';

import { getSchemaInfo } from './utils/getSchemaInfo.util';
import { handleFormBuilderError } from './utils/handleFormBuilderError.util';

import { Stepper } from './components/stepper.component';
import { FormField } from './components/formField.component';
import { SubmitField } from './components/submitField.component';
import { getFieldRules, FieldRules } from './utils/validation.utils';
import { PreviousStepField } from './components/previousStepField.component';
import { FORM_CLASSNAMES } from './constants';
import { filterDependentsFieldsById } from './utils/conditionalFields.utils';

const EMPTY_OBJECT = {} as const;

export interface FormBuilderProps {
  defaultValues?: DefaultValues<FieldValues>;
  behavior?: keyof ValidationMode;
  schema: FormSchema;
  dictionary: Dictionary;
  onNextStep?: (value: UnpackNestedValue<FieldValues>) => void;
  onPreviousStep?: (value: any) => void;
  onSubmit: SubmitHandler<FieldValues>;
  extraValidation?: ExtraValidation;
  isLastStep?: boolean;
  currentStepIndex?: number;
  formProps?: { [key: string]: any };
  debug?: boolean;
}

export function FormBuilder({
  defaultValues,
  behavior = 'onChange',
  schema,
  dictionary,
  onNextStep = _.noop,
  onPreviousStep = _.noop,
  onSubmit,
  extraValidation,
  isLastStep = true,
  currentStepIndex = 0,
  formProps = EMPTY_OBJECT,
  debug = false
}: FormBuilderProps) {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isValidating, errors, dirtyFields },
    control,
    getValues,
    setValue,
    trigger,
    setFocus
  } = useForm<FieldValues>({
    mode: behavior,
    criteriaMode: 'all',
    defaultValues
  });

  const isPreFilled = !_.isEmpty(defaultValues);

  const typesAllowed = React.useMemo(() => _.keys(dictionary), [dictionary]);

  const { fields, fieldsById, stepsById, submitLabel } = React.useMemo(
    () => getSchemaInfo(schema, typesAllowed, currentStepIndex),
    [currentStepIndex, schema, typesAllowed]
  );

  const filteredFields = filterDependentsFieldsById({
    fieldsById,
    fields,
    getValues,
    errors,
    extraValidation
  });

  const validationRulesById = React.useMemo(
    () =>
      _.reduce(
        fieldsById,
        (accumulator, fieldId) => {
          const validation = _.get(
            fields,
            [fieldId, 'validation'],
            EMPTY_OBJECT
          );

          return {
            ...accumulator,
            [fieldId]: getFieldRules({ validation, extraValidation })
          };
        },
        {} as { [key: string]: FieldRules }
      ),
    [extraValidation, fields, fieldsById]
  );

  const setFieldValue = React.useCallback(
    (id: Path<FieldValues>, value) =>
      setValue(id, value, { shouldValidate: true, shouldDirty: true }),
    [setValue]
  );

  const triggerValidationField = React.useCallback(trigger, [trigger]);

  const isFormStepValid = useIsFormStepValid({
    errors,
    schema,
    isLastStep,
    currentStepIndex,
    dirtyFields,
    defaultValues,
    isValidating
  });

  useAutoFocus({ currentStepIndex, schema, setFocus });

  // Displays nice and informative errors in dev mode
  if (debug) handleFormBuilderError(typesAllowed, schema, dictionary);

  if (
    _.isEmpty(schema) ||
    _.isEmpty(dictionary) ||
    typeof onSubmit !== 'function'
  )
    return null;

  return (
    <>
      <form
        data-testid="form-builder"
        aria-labelledby="form-label-element-id"
        {...formProps}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stepper currentStepIndex={currentStepIndex}>
          {_.map(stepsById, (stepId) => (
            <React.Fragment key={stepId}>
              {_.map(filteredFields, (fieldId) => {
                const { type, id, defaultValue, meta, validation } =
                  fields[fieldId];

                return (
                  <Controller
                    key={id}
                    name={id}
                    control={control}
                    defaultValue={defaultValue}
                    rules={validationRulesById[fieldId]}
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
                        isValidating={isValidating}
                        {...meta}
                      />
                    )}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </Stepper>
        <div className={FORM_CLASSNAMES.formActionsWrapper}>
          <PreviousStepField
            onPreviousStep={onPreviousStep}
            currentStepIndex={currentStepIndex}
            dictionary={dictionary}
          />
          <SubmitField
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
        </div>
      </form>
      {debug && <DevTool control={control} />}
    </>
  );
}
