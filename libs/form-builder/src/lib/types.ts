import * as React from 'react';
import {
  Path,
  PathValue,
  FieldValues,
  FieldNamesMarkedBoolean,
  UnpackNestedValue
} from 'react-hook-form';

export type DirtyFields = FieldNamesMarkedBoolean<FieldValues>;

export interface FormMeta {
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
  title: string;
  type: string;
  meta?: FormMeta | undefined;
  dependsOn?: Array<string | DependsOnObject>;
  validation?: Validations | undefined;
  defaultValue?:
    | UnpackNestedValue<PathValue<unknown, never>>
    | string
    | number
    | string[]
    | number[]
    | Path<string>;
}

export interface FormFields {
  [FieldId: string]: FormField;
}

export interface FormStep {
  id: string;
  fieldsById: string[];
  submit: {
    label: string;
  };
  meta?: FormMeta;
}

export interface FormSteps {
  [StepId: string]: FormStep;
}

export interface FormSchema {
  fields: FormFields;
  steps: FormSteps;
  stepsById: string[];
}

export interface Dictionary {
  [FieldId: string]: React.VoidFunctionComponent<any>;
}

export interface ExtraValidation {
  [FieldId: string]: (
    value?: any
  ) => (input?: any) => boolean | string | Promise<boolean | string>;
}
