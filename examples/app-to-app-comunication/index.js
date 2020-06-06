import { init } from '@fronty/core';
import './style.css';

(async () => {
	const header = document.createElement('header');
	const content = document.createElement('main');
	const sidebar = document.createElement('aside');
	const footer = document.createElement('footer');

	document.body.appendChild(header);
	document.body.appendChild(content);
	document.body.appendChild(sidebar);
	document.body.appendChild(footer);

	const headerApp = {
		id: 'header',
		url: '/header-app',
		container: header,
		onMount({ app }) {
			console.log(app);
		},
	};

	const contentApp = {
		id: 'content',
		url: '/content-app',
		container: content,
		onMount({ app }) {
			const win = app.iframe.contentWindow;

			win.addEventListener('hashchange', (e) => {
				fronty.apps.get('sidebar').window.location.hash =
					e.target.location.hash;

				// const page = e.target.location.hash.replace('#', '') || '/';
				// window.history.pushState(null, null, '#' + page);
			});
		},
	};

	const footerApp = {
		id: 'footer',
		url: '/footer-app',
		container: footer,
		onMount({ app }) {
			console.log(app);
		},
	};

	const sidebarApp = {
		id: 'sidebar',
		url: '/sidebar-app',
		container: sidebar,
		onMount({ app }) {
			const win = app.iframe.contentWindow;

			win.addEventListener('hashchange', (e) => {
				fronty.apps.get('content').window.location.hash =
					e.target.location.hash;

				// const page = e.target.location.hash.replace('#', '') || '/';
				// window.history.pushState(null, null, '#' + page);
			});
		},
	};

	const fronty = await init(headerApp, contentApp, footerApp, sidebarApp);

	console.log('Fronty', fronty);
})();
