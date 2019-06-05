import { iframe } from './iframe';
import { js } from './js';

const fronty = window.fronty || (window.fronty = {});
if (!fronty.apps) {
	fronty.apps = new Map();
}

const types = { iframe, js };

const register = (fronty.register =
	fronty.register ||
	(({ id, ...options }) => {
		if (!id) throw new Error('You need to provide a unique app id.');

		if (fronty.apps.has(id)) {
			Object.assign(options, fronty.apps.get(id));
		}

		return fronty.apps.set(id, options);
	}));

const init = (fronty.init =
	fronty.init ||
	(async (...apps) => {
		apps.forEach(register);

		for (const [id, app] of fronty.apps) {
			const { url, type = 'iframe', container, onMount } = app;

			const applyType = types[type];

			try {
				if (applyType)
					await applyType({ container, url, fronty, id, app, onMount });
			} catch (e) {
				console.error(e);
			}
		}

		return fronty;
	}));

window.addEventListener('DOMContentLoaded', () => {
	const nodes = Array.from(document.querySelectorAll('fronty-app')).map(
		container =>
			Object.assign(
				{ container },
				...[...container.attributes].map(({ name, value }) => ({
					[name]: value
				}))
			)
	);

	console.log(nodes);

	init(...nodes).then(() => window.dispatchEvent(new Event('fronty.autoinit')));
});

class Fronty extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define('fronty-app', Fronty);

export { fronty, apps, register, init };
