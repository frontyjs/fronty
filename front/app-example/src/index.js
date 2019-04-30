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

(async () => {
  const fronty = await init(headerApp, apiApp);

  console.log(fronty.apps);

  [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Services', url: '/services' },
    { title: 'Contact Us', url: '/contact-us' }
  ].forEach(fronty.apps.get('header').addMenuItem);
})();
