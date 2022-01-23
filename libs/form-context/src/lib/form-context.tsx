import React, { ReactChildren, useEffect, useRef } from 'react';

import { reducer, initialState } from './forms.reducer';

const FormsStateContext = React.createContext({});
const FormsDispatchContext = React.createContext<any>(() => void null);

const FormsProvider = ({
  children
}: {
  children: ReactChildren | JSX.Element;
}) => {
  const isInitialized = useRef(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    if (isInitialized && isInitialized.current) {
      return;
    }

    isInitialized.current = true;
  });

  return (
    <FormsStateContext.Provider value={state}>
      <FormsDispatchContext.Provider value={dispatch}>
        {children}
      </FormsDispatchContext.Provider>
    </FormsStateContext.Provider>
  );
};

function useFormsState() {
  const context = React.useContext(FormsStateContext);
  if (context === undefined) {
    throw new Error('useFormsState must be used within a FormsProvider');
  }
  return context;
}

function useFormsDispatch() {
  const context = React.useContext(FormsDispatchContext);
  if (context === undefined) {
    throw new Error('useFormsDispatch must be used within a FormsProvider');
  }
  return context;
}

function useForms() {
  return [useFormsState(), useFormsDispatch()];
}

export { FormsProvider, useForms, useFormsState, useFormsDispatch };
