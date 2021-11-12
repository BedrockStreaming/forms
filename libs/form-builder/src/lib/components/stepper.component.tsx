import _ from 'lodash';
import { ReactElement } from 'react';

interface StepperProps {
  children: ReactElement[] | ReactElement;
  currentStepIndex: number;
}

export const Stepper = ({ children, currentStepIndex }: StepperProps) => {
  const child = _.get(children, currentStepIndex, null);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{child}</>;
};
