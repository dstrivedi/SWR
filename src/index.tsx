import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import { App } from './App';

const fetcher = (url) => fetch(url).then((res) => res.json());

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <SWRConfig value={{fetcher}}>
      <App />
    </SWRConfig>
  </StrictMode>
);
