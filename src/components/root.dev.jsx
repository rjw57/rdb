import React from 'react';

import { Provider } from 'react-redux';
import App from './app.jsx';
import DevTools from './devtools.jsx';

let Root = props => (
  <Provider store={props.store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);

export default Root;
