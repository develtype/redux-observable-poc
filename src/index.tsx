import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import { rootStore } from './redux/root.store';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
}
