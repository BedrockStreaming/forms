import { UseFormGetValues, FieldValues, FieldErrors } from 'react-hook-form';
import { ExtraValidation, FormField, FormFields } from '../types';

export interface ShouldDisplayField {
  getValues: UseFormGetValues<FieldValues>;
  extraValidation?: ExtraValidation;
  errors: FieldErrors;
  dependsOn: FormField['dependsOn'];
}

export const shouldDisplayField = ({
  dependsOn,
  getValues,
  extraValidation,
  errors
}: ShouldDisplayField) => {
  if (!dependsOn) return true;

  const dependsOnConditions = [] as boolean[];

  dependsOn.forEach((dependRule) => {
    if (typeof dependRule === 'string') {
      return dependsOnConditions.push(
        !!getValues(dependRule) && !errors[dependRule]
      );
    }

    if (!extraValidation || !extraValidation[dependRule.callback]) {
      return dependsOnConditions.push(!errors[dependRule.key]);
    }

    return dependsOnConditions.push(
      !!extraValidation[dependRule.callback](dependRule.value)(
        getValues(dependRule.key)
      ) && !errors[dependRule.key]
    );
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
  errors
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
      errors
    })
      ? [...acc, fieldId]
      : acc;
  }, [] as string[]);
};
