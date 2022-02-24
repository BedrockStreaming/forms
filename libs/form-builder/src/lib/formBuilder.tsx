import * as React from 'react';
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  ValidationMode,
} from 'react-hook-form';

import { Dictionary, ExtraValidation, FormSchema } from './types';
import { useAutoFocus } from './hooks/useAutoFocus.hook';
import { useIsFormStepValid } from './hooks/useIsFormStepValid';

import { getSchemaInfo } from './utils/getSchemaInfo.util';
import { handleFormBuilderError } from './utils/handleFormBuilderError.util';

import { Stepper } from './components/stepper.component';
import { FormField } from './components/formField.component';
import { SubmitField } from './components/submitField.component';
import { getFieldRules, FieldRules } from './utils/validation.utils';
import { filterDependentsFieldsById } from './utils/conditionalFields.utils';
import { isEmpty } from './utils/object.utils';
import { useDevtools } from './hooks/useDevtools.hook';

const EMPTY_OBJECT = {} as const;
const NOOP = () => null;

export interface FormBuilderProps {
  formId: string;
  schema: FormSchema;
  dictionary: Dictionary;
  onSubmit: SubmitHandler<FieldValues>;
  onNextStep?: (value: UnpackNestedValue<FieldValues>) => void;
  defaultValues?: DefaultValues<FieldValues>;
  behavior?: keyof ValidationMode;
  extraValidation?: ExtraValidation;
  isLastStep?: boolean;
  currentStepIndex?: number;
  formProps?: { [key: string]: unknown };
  debug?: boolean;
}

export function FormBuilder({
  formId,
  schema,
  dictionary,
  onSubmit,
  onNextStep = NOOP,
  extraValidation,
  defaultValues,
  behavior = 'onChange',
  isLastStep = true,
  currentStepIndex = 0,
  formProps = EMPTY_OBJECT,
  debug = false,
}: FormBuilderProps) {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isValidating, errors, dirtyFields },
    control,
    getValues,
    setValue,
    trigger,
    setFocus,
  } = useForm<FieldValues>({
    mode: behavior,
    criteriaMode: 'all',
    defaultValues,
  });

  const Debug = useDevtools(debug);

  const isPreFilled = defaultValues && typeof defaultValues === 'object' && Object.keys(defaultValues).length > 0;

  const typesAllowed = React.useMemo(() => Object.keys(dictionary || EMPTY_OBJECT), [dictionary]);

  const { fields, fieldsById, stepsById, submitLabel } = React.useMemo(
    () => getSchemaInfo(schema, typesAllowed, currentStepIndex),
    [currentStepIndex, schema, typesAllowed],
  );

  const filteredFields = filterDependentsFieldsById({
    fieldsById,
    fields,
    getValues,
    errors,
    extraValidation,
  });

  const validationRulesById = React.useMemo(
    () =>
      fieldsById.reduce((accumulator, fieldId) => {
        const validation = fields?.[fieldId]?.validation || EMPTY_OBJECT;

        return {
          ...accumulator,
          [fieldId]: getFieldRules({ validation, extraValidation }),
        };
      }, {} as { [key: string]: FieldRules }),
    [extraValidation, fields, fieldsById],
  );

  const setFieldValue = React.useCallback(
    (id: Path<FieldValues>, value) => setValue(id, value, { shouldValidate: true, shouldDirty: true }),
    [setValue],
  );

  const triggerValidationField = React.useCallback(trigger, [trigger]);

  const isFormStepValid = useIsFormStepValid({
    errors,
    schema,
    isLastStep,
    currentStepIndex,
    dirtyFields,
    defaultValues,
    isValidating,
  });

  useAutoFocus({ currentStepIndex, schema, setFocus });

  // Displays nice and informative errors in dev mode
  if (debug) handleFormBuilderError(typesAllowed, schema, dictionary);

  if (isEmpty(schema) || isEmpty(dictionary) || typeof onSubmit !== 'function') return null;

  return (
    <>
      <form
        data-testid="form-builder"
        aria-labelledby="form-label-element-id"
        {...formProps}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stepper currentStepIndex={currentStepIndex}>
          {stepsById?.map((stepId) => (
            <React.Fragment key={stepId}>
              {filteredFields?.map((fieldId) => {
                const { type, id, defaultValue, meta, validation } = fields[fieldId];

                return (
                  <Controller
                    key={id}
                    name={id}
                    control={control}
                    defaultValue={defaultValue}
                    rules={validationRulesById[fieldId]}
                    render={({ field }) => {
                      const { ref, ...fieldRest } = field;
                      return (
                        <FormField
                          id={id}
                          fieldType={type}
                          validation={validation}
                          dictionary={dictionary}
                          errors={errors?.[id]}
                          setFieldValue={setFieldValue}
                          triggerValidationField={triggerValidationField}
                          propRef={ref}
                          isValidating={isValidating}
                          {...meta}
                          {...fieldRest}
                        />
                      );
                    }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </Stepper>
        <SubmitField
          formId={formId}
          dictionary={dictionary}
          submitDisabled={!(isDirty || isPreFilled) || !isValid}
          nextDisabled={!isFormStepValid}
          isLastStep={isLastStep}
          submitLabel={submitLabel}
          getValues={getValues}
          onNextStep={onNextStep}
        />
      </form>
      {debug && <Debug control={control} />}
    </>
  );
}
