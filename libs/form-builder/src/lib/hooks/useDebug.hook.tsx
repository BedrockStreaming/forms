import * as React from 'react';

const BaseDebug = (): JSX.Element | null => null;

export const useDevtools = (debug: boolean) => {
  const [, setLoaded] = React.useState(false);
  const Component = React.useRef<React.ElementType>(BaseDebug);

  React.useEffect(() => {
    if (debug && Component.current === BaseDebug) {
      // eslint-disable-next-line import/no-extraneous-dependencies
      import('@hookform/devtools')
        .then(({ DevTool }) => {
          Component.current = DevTool as React.ElementType;
          setLoaded(true);
        })
        .catch();
    }
  }, [debug, setLoaded]);

  return Component.current;
};
