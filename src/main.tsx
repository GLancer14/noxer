import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router'
import { Provider } from 'react-redux'
import { setupStore } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={setupStore}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
)
