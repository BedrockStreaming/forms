import { render } from '@testing-library/react';
import { Stepper } from '../stepper.component';

const childOne = <span key="one">one</span>;
const childTwo = <span key="two">two</span>;
const children = [childOne, childTwo];

describe('<Stepper />', () => {
  const getWrapper = (props) => render(<Stepper {...props} />);

  it('should not render anything if we pass do not pass children', () => {
    return expect(
      getWrapper({ currentStepIndex: 0 }).container.firstChild
    ).toBeNull();
  });

  it('should render first child', async () => {
    const spans = await getWrapper({
      currentStepIndex: 0,
      children
    }).findAllByText('one');

    return expect(spans).toHaveLength(1);
  });

  it('should render second child', async () => {
    const spans = await getWrapper({
      currentStepIndex: 1,
      children
    }).findAllByText('two');

    return expect(spans).toHaveLength(1);
  });
});
