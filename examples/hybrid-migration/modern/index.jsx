import React from 'react';
import { render } from 'react-dom';

import { App } from './App.jsx';

const container = document.createElement('div');
document.body.appendChild(container);
render(<App />, container);
