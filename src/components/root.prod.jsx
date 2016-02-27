import React from 'react';

import { Provider } from 'react-redux';
import App from './app.jsx';

let Root = props => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

export default Root;
