import { renderHook, waitFor } from '@testing-library/react';
import { useDevtools, BaseDebug } from '../useDevtools.hook';

jest.mock('@hookform/devtools', () => ({ DevTools: 'foo' }));

describe('useDebug', () => {
  it('should load Devtools', async () => {
    expect.assertions(2);
    const { result, rerender, unmount } = renderHook(() => useDevtools(true));

    rerender(true);
    await waitFor(() => {
      expect(result.current).not.toBe(BaseDebug);
    });
    unmount();
  });

  it('should not load Devtools', async () => {
    const { result } = renderHook(() => useDevtools(false));

    expect(result.current).toBe(BaseDebug);
  });
});
