import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Context from './Context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Context />
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
