import { init } from '@fronty/core';

import './style.css';

const reactApp = {
  id: 'react',
  onMount({ container, fronty }) {
    const button = document.createElement('button');
    button.innerText = 'Open Modal';
    button.onclick = () =>
      fronty.apps.get('modal').open(`Hello from React App!`);
    container.appendChild(button);
  }
};

const modalApp = {
  id: 'modal',
  type: 'js',
  div: document.createElement('div'),
  open(text) {
    this.div.className = 'modal';
    this.div.innerHTML = `<section><h1>${text}</h1><button>Close</button></section>`;
    this.div
      .querySelector('button')
      .addEventListener('click', this.close.bind(this));

    document.body.prepend(this.div);
  },
  close() {
    document.body.removeChild(this.div);
  }
};

init(modalApp, reactApp);
