import { render } from '@testing-library/react';
import { Stepper } from '../stepper.component';

const childOne = <span key="one">one</span>;
const childTwo = <span key="two">two</span>;

describe('<Stepper />', () => {
  it('should not render anything if we pass do not pass children', () => {
    const firstChild = render(<Stepper {...{ currentStepIndex: 0 }} />)
      .container.firstChild;
    return expect(firstChild).toBeNull();
  });

  it('should render first child', async () => {
    const spans = await render(
      <Stepper {...{ currentStepIndex: 0 }}>
        <span key="one">one</span>
        <span key="two">two</span>
      </Stepper>
    ).findAllByText('one');

    return expect(spans).toHaveLength(1);
  });

  it('should render second child', async () => {
    const spans = await render(
      <Stepper {...{ currentStepIndex: 1 }}>
        <span key="one">one</span>
        <span key="two">two</span>
      </Stepper>
    ).findAllByText('two');

    return expect(spans).toHaveLength(1);
  });
});
