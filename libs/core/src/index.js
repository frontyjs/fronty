import { iframe } from './iframe';
import { js } from './js';

const fronty = { apps: new Map() };

const types = { iframe, js };

const register = ({ id, ...options }) => {
  if (!id) throw new Error('You need to provide a unique app id.');

  if (fronty.apps.has(id)) {
    Object.assign(options, fronty.apps.get(id));
  }

  return fronty.apps.set(id, options);
};

const init = async (...apps) => {
  const nodes = Array.from(document.querySelectorAll('fronty-app')).map(
    container =>
      Array.from(container.attributes).reduce(
        (acc, { name, value }) => {
          acc[name] = value;
          return acc;
        },
        { container }
      )
  );

  apps.push(...nodes);

  apps.forEach(register);

  for (const [id, app] of fronty.apps) {
    const { url, type = 'iframe', container, onMount } = app;

    const applyType = types[type];

    try {
      if (applyType) await applyType({ container, url, fronty, id, app, onMount });
    } catch (e) {
      console.error(e);
    }
  }

  return fronty;
};

class Fronty extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('fronty-app', Fronty);

export { register, init };
