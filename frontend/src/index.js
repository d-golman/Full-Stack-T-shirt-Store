import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/app';
import store from './services/store/store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
