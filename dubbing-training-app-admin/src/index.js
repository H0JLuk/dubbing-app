import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import { Provider } from 'react-redux'
import store from './store/store'
import { ProvideAuth } from './api/Auth'
import './scss/index.scss'



ReactDOM.render(
  <Provider store={store}>
    <ProvideAuth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProvideAuth>
  </Provider>,
  document.getElementById('root')
);