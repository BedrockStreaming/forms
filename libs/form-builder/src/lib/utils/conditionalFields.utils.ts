import { UseFormGetValues, FieldValues } from 'react-hook-form';
import { ExtraValidation, FormField, FormFields } from '../types';

export const shouldDisplayField = (
  dependsOn: FormField['dependsOn'],
  getValues: UseFormGetValues<FieldValues>,
  extraValidation?: ExtraValidation
) => {
  if (!dependsOn) return true;

  const dependsOnConditions = [] as boolean[];

  dependsOn.forEach((dependRule) => {
    if (typeof dependRule === 'string') {
      return dependsOnConditions.push(!!getValues(dependRule));
    }

    if (!extraValidation || !extraValidation[dependRule.callback]) {
      return dependsOnConditions.push(true);
    }

    return dependsOnConditions.push(
      !!extraValidation[dependRule.callback](dependRule.value)(
        getValues(dependRule.key)
      )
    );
  });

  return dependsOnConditions.filter((value) => !value).length === 0;
};

export const filterDependentsFieldsById = (
  fieldsById: string[],
  fields: FormFields,
  getValues: UseFormGetValues<FieldValues>,
  extraValidation?: ExtraValidation
) => {
  return fieldsById.reduce((acc, fieldId) => {
    const { dependsOn } = fields[fieldId];
    if (!dependsOn) {
      return [...acc, fieldId];
    }

    return shouldDisplayField(dependsOn, getValues, extraValidation)
      ? [...acc, fieldId]
      : acc;
  }, [] as string[]);
};
