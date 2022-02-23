import * as React from 'react';

export interface StepperProps {
  children?: React.ReactElement[] | null;
  currentStepIndex: number;
}

export const Stepper = ({ children, currentStepIndex }: StepperProps) => {
  const child = children?.[currentStepIndex] || null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{child}</>;
};
