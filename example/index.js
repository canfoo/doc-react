import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';

import App from './app.js';

render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./app.js', () => {
    const App = require('./app.js').default;

    render(<AppContainer><App /></AppContainer>, document.getElementById('app'));
  });
}
