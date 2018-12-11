import { register, init } from '@frontyjs/core';
import headerApp from '@frontyjs/header';

import './style.css';

const header = document.createElement('div');
header.id = 'header';

const content = document.createElement('div');
content.id = 'content';

const footer = document.createElement('footer');
footer.id = 'footer';

document.body.appendChild(header);
document.body.appendChild(content);
document.body.appendChild(footer);

register({
  name: 'content',
  url: '/content',
  type: 'iframe'
});

register({
  name: 'footer',
  url: '/footer',
  type: 'iframe'
});

register(headerApp);

register({
  name: 'api',
  async getText() {
    return 'bla';
  },
  alert(text) {
    console.log('alert', text)
  }
});

init()
  .then((fronty) => console.log(fronty.apps))
  .catch(console.error);
