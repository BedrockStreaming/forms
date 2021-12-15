import * as React from 'react';
import _ from 'lodash';

interface StepperProps {
  children: React.ReactElement[] | React.ReactElement;
  currentStepIndex: number;
}

export const Stepper = ({ children, currentStepIndex }: StepperProps) => {
  const child = _.get(children, currentStepIndex, null);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{child}</>;
};
