import { UseFormGetValues, FieldValues, FieldErrors } from 'react-hook-form';
import { ExtraValidation, FormField, FormSteps } from '../types';

export interface ShouldDisplayStep {
  getValues:
    | UseFormGetValues<FieldValues>
    | ((selector: string) => Partial<FieldValues>);
  extraValidation?: ExtraValidation;
  errors: FieldErrors;
  dependsOn: FormField['dependsOn'];
}

export const shouldDisplayStep = ({
  dependsOn,
  getValues,
  extraValidation,
  errors
}: ShouldDisplayStep) => {
  if (!dependsOn) return true;

  const dependsOnConditions = [] as boolean[];

  dependsOn.forEach((dependRule) => {
    // Validate at field level on string
    if (typeof dependRule === 'string') {
      return dependsOnConditions.push(
        !!getValues(dependRule) && !errors[dependRule]
      );
    }
    const fieldValue = getValues(dependRule.id);
    const fieldError = errors[dependRule.id];

    // When the validate option is disabled
    // Check for specific validation error
    if (!dependRule.validate) {
      const validationError = fieldError && fieldError[dependRule.key];
      return dependsOnConditions.push(!!fieldValue && !validationError);
    }

    const validateMethod = extraValidation && extraValidation[dependRule.key];

    // When validation method is missing from extraValidation, only assert on fieldError
    if (!validateMethod) {
      return dependsOnConditions.push(!!fieldValue && !fieldError);
    }

    return dependsOnConditions.push(
      !!validateMethod(dependRule.value)(fieldValue) && !fieldError
    );
  });

  return dependsOnConditions.filter((value) => !value).length === 0;
};

export interface FilterDependentsStepsById {
  stepsById: string[];
  getValues:
    | UseFormGetValues<FieldValues>
    | ((selector: string) => Partial<FieldValues>);
  extraValidation?: ExtraValidation;
  errors: FieldErrors;
  steps: FormSteps;
}

export const filterDependentsStepsById = ({
  stepsById,
  steps,
  getValues,
  extraValidation,
  errors
}: FilterDependentsStepsById) => {
  return stepsById.reduce((acc, id) => {
    const { dependsOn } = steps[id];
    if (!dependsOn) {
      return [...acc, id];
    }

    return shouldDisplayStep({
      dependsOn,
      getValues,
      extraValidation,
      errors
    })
      ? [...acc, id]
      : acc;
  }, [] as string[]);
};
