import React from 'react';
import _ from 'lodash';

import { FormField } from './formField.component';
import { PREVIOUS_FIELD_TYPE } from '../constants';
import { Dictionary } from '../types';

export interface PreviousStepFieldProps {
  dictionary: Dictionary;
  onPreviousStep: (value?: any) => void;
  currentStepIndex: number;
  [key: string]: any;
}

export const PreviousStepField = ({
  dictionary,
  onPreviousStep,
  currentStepIndex,
  ...props
}: PreviousStepFieldProps) => {
  if (currentStepIndex === 0) {
    return null;
  }

  return (
    <FormField
      id="previous-field"
      dictionary={dictionary}
      fieldType={PREVIOUS_FIELD_TYPE}
      onClick={onPreviousStep}
      {...props}
    />
  );
};

PreviousStepField.defaultProps = {
  onPreviousStep: _.noop
};
