import selectors from './selectors';
import pages from './pages';

const constants = {
  ...selectors,
  ...pages,
};

export const getConstant = (constantName) => {
  const constantValue = constants[constantName];

  if (!constantValue) {
    throw new Error(`Could not find constant "${constantName}".`);
  }

  if (typeof constantValue === 'string' && constantValue.startsWith('$')) {
    return `[data-testid="${constantValue.substring(1)}"]`;
  }

  return constantValue;
};
