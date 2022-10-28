import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbackProvider } from '@rollbar/react';
import { Provider } from 'react-redux'

import App from './App';
import store from './store/store'
import { ProvideAuth } from './api/Auth'
import './scss/index.scss'

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
      environment: process.env.REACT_APP_ENV_MODE
  }
};

ReactDOM.render(
  <Provider store={store}>
    <RollbackProvider config={rollbarConfig}>
      <ProvideAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideAuth>
    </RollbackProvider>
  </Provider>,
  document.getElementById('root')
);

