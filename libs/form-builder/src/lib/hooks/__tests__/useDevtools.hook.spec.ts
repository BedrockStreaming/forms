import { renderHook } from '@testing-library/react-hooks';
import { useDevtools, BaseDebug } from '../useDevtools.hook';

describe('useDebug', () => {
  it('should load Devtools', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDevtools(true));

    await waitForNextUpdate();

    expect(result.current).not.toBe(BaseDebug);
  });

  it('should not load Devtools', async () => {
    const { result } = renderHook(() => useDevtools(false));

    expect(result.current).toBe(BaseDebug);
  });
});
