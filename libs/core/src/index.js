import apps from './apps';
import { iframe } from './iframe';
import { js } from './js';

const types = { iframe, js };

const register = ({ name, ...options }) => {
  return apps.set(name, options);
};

const init = async () => {
  for (const [name, options] of apps) {
    const container = document.getElementById(name);
    const { url, type, onMount } = options;

    try {
      types[type] && (await types[type]({ container, url, apps, name, onMount }));
    } catch (e) {
      console.error(e);
    }
  }

	return { apps };
};
export { register, init };
