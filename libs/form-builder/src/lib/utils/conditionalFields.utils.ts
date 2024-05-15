import { UseFormGetValues, FieldValues, FieldErrors, FieldError } from 'react-hook-form';
import { ExtraValidation, FormField, FormFields } from '../types';

export interface ShouldDisplayField {
  getValues: UseFormGetValues<FieldValues>;
  extraValidation?: ExtraValidation;
  errors: FieldErrors;
  dependsOn: FormField['dependsOn'];
}

export const shouldDisplayField = ({ dependsOn, getValues, extraValidation, errors }: ShouldDisplayField) => {
  if (!dependsOn) return true;

  const dependsOnConditions = [] as boolean[];

  dependsOn.forEach((dependRule) => {
    // Validate at field level on string
    if (typeof dependRule === 'string') {
      return dependsOnConditions.push(!!getValues(dependRule) && !errors[dependRule]);
    }
    const fieldValue = getValues(dependRule.fieldId);
    const fieldError = errors[dependRule.fieldId];

    // When the validate option is disabled
    // Check for specific validation error
    if (!dependRule.validate) {
      const validationError = fieldError && fieldError[dependRule.key as keyof FieldError];
      return dependsOnConditions.push(!!fieldValue && !validationError);
    }

    const validateMethod = extraValidation && extraValidation[dependRule.key];

    // When validation method is missing from extraValidation, only assert on fieldError
    if (!validateMethod) {
      return dependsOnConditions.push(!!fieldValue && !fieldError);
    }

    return dependsOnConditions.push(!!validateMethod(dependRule.value)(fieldValue) && !fieldError);
  });

  return dependsOnConditions.filter((value) => !value).length === 0;
};

export interface FilterDependentsFieldsById {
  fieldsById: string[];
  fields: FormFields;
  getValues: UseFormGetValues<FieldValues>;
  extraValidation?: ExtraValidation;
  errors: FieldErrors;
}

export const filterDependentsFieldsById = ({
  fieldsById,
  fields,
  getValues,
  extraValidation,
  errors,
}: FilterDependentsFieldsById) => {
  return fieldsById.reduce((acc, fieldId) => {
    const { dependsOn } = fields[fieldId];
    if (!dependsOn) {
      return [...acc, fieldId];
    }

    return shouldDisplayField({
      dependsOn,
      getValues,
      extraValidation,
      errors,
    })
      ? [...acc, fieldId]
      : acc;
  }, [] as string[]);
};
