import { iframe } from './iframe';
import { js } from './js';

const fronty = window.fronty || (window.fronty = {});

const apps = (fronty.apps = fronty.apps || new Map());

const Types = (fronty.Types =
	fronty.Types ||
	(() => {
		const types = { iframe, js };

		const add = (name, code) => {
			types[name] = code;
		};

		const get = (name) => types[name];

		return { add, get };
	}))();

const register = (fronty.register =
	fronty.register ||
	(({ id, ...options }) => {
		if (!id) throw new Error('You need to provide a unique app id.');

		if (apps.has(id)) {
			Object.assign(options, fronty.apps.get(id));
		}

		return apps.set(id, options);
	}));

const init = (fronty.init =
	fronty.init ||
	(async (...args) => {
		args.forEach(register);

		for (const [id, app] of apps) {
			const { url, type = 'iframe', container, onMount, initialized } = app;

			if (initialized) continue;

			const applyType = Types.get(type);

			try {
				if (applyType) {
					app.initialized = true;
					await applyType({ container, url, fronty, id, app, onMount });
				}
			} catch (e) {
				app.initialized = false;
				console.error(e);
			}
		}

		return fronty;
	}));

window.addEventListener('DOMContentLoaded', async () => {
	const nodes = Array.from(document.querySelectorAll('fronty-app')).map(
		(container) =>
			Object.assign(
				{ container },
				...[...container.attributes].map(({ name, value }) => ({
					[name]: value,
				}))
			)
	);

	if (!nodes.length) return;

	await init(...nodes);
	window.dispatchEvent(new Event('fronty.autoinit'));
});

class Fronty extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define('fronty-app', Fronty);

export { fronty, init, apps, register, Types };
