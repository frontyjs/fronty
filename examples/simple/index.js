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
		url: '/header-app/',
		container: header,
		onMount({ app }) {
			console.log(app);
		},
	};

	const contentApp = {
		id: 'content',
		url: '/content-app/',
		container: content,
		onMount({ app }) {
			console.log(app);
		},
	};

	const footerApp = {
		id: 'footer',
		url: '/footer-app/',
		container: footer,
		onMount({ app }) {
			console.log(app);
		},
	};

	const sidebarApp = {
		id: 'sidebar',
		url: '/sidebar-app/',
		container: sidebar,
		onMount({ app }) {
			console.log(app);
		},
	};

	const fronty = await init(headerApp, contentApp, footerApp, sidebarApp);

	console.log('Fronty', fronty);
})();
