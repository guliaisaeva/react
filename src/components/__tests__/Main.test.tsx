import React from 'react';
import ReactDOM from 'react-dom/client';
import { vi, beforeEach, describe, it, expect } from 'vitest';

vi.mock('react-dom/client');

describe('main.tsx', () => {
  let createRootMock: ReturnType<typeof vi.fn>;
  let renderMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    renderMock = vi.fn();
    createRootMock = vi.fn(() => ({ render: renderMock }));
    (ReactDOM.createRoot as unknown as ReturnType<typeof vi.fn>) =
      createRootMock;

    document.body.innerHTML = '<div id="root"></div>';
  });

  it('renders App inside StrictMode', async () => {
    vi.resetModules();
    await import('../../main');
    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById('root')
    );
    expect(renderMock).toHaveBeenCalled();

    const strictModeWrapper = renderMock.mock.calls[0][0];
    expect(strictModeWrapper.type).toBe(React.StrictMode);

    const browserRouterWrapper = strictModeWrapper.props.children;
    expect(browserRouterWrapper.type.name).toBe('BrowserRouter');

    const queryClientProviderWrapper = browserRouterWrapper.props.children;
    expect(queryClientProviderWrapper.type.name).toBe('QueryClientProvider');

    const appComponent = queryClientProviderWrapper.props.children;
    expect(appComponent.type.name).toBe('App');
  });
});
