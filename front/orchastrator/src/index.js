import { init } from '@frontyjs/core';
import headerApp from '@frontyjs/header';

import './style.css';

const apiApp = {
  id: 'api',
  type: 'js',
  async getText() {
    return 'bla';
  },
  alert(text) {
    console.log('alert', text);
  }
};

init(headerApp, apiApp)
  .then(fronty => console.log(fronty.apps))
  .catch(console.error);
