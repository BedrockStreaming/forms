import * as React from 'react';
import { Path, PathValue, FieldValues, FieldNamesMarkedBoolean, UnpackNestedValue } from 'react-hook-form';

export type DirtyFields = FieldNamesMarkedBoolean<FieldValues>;

export interface StepMeta {
  [key: string]: unknown;
}

export interface Validation {
  key: string;
  type?: string;
  message: string;
  value?: unknown;
}

export interface Validations {
  [key: string]: Validation;
}

export interface DependsOnObject {
  fieldId: string;
  key: string;
  value?: string | number | null | string[] | number[];
  validate?: boolean;
}

export interface FormField {
  id: string;
  type: string;
  meta?: StepMeta | undefined;
  dependsOn?: Array<string | DependsOnObject>;
  validation?: Validations | undefined;
  defaultValue?: UnpackNestedValue<PathValue<unknown, never>> | string | number | string[] | number[] | Path<string>;
}

export interface FormFields {
  [key: string]: FormField;
}

export interface FormStep {
  id: string;
  fieldsById: string[];
  submit: {
    label: string;
  };
  meta?: StepMeta;
}

export interface FormSteps {
  [key: string]: FormStep;
}

export interface FormMeta {
  shouldDisplayRequiredHint?: boolean;
}

export interface FormSchema {
  fields: FormFields;
  formMeta?: FormMeta;
  steps: FormSteps;
  stepsById: string[];
}

export interface Dictionary {
  [key: string]: React.VoidFunctionComponent<any>;
}

export interface ExtraValidation {
  [key: string]: (value?: any) => (input?: any) => boolean | string | undefined | Promise<boolean | string | undefined>;
}
