import { init } from '@fronty/core';
import './style.css';

(async () => {
	const app1Container = document.createElement('header');
	const app2Container = document.createElement('main');

	document.body.appendChild(app1Container);
	document.body.appendChild(app2Container);

	const app1 = {
		id: 'app1',
		url: '/app1/',
		container: app1Container,
		onMount(...args) {
			console.log(args);
		},
	};

	const app2 = {
		id: 'app2',
		url: '/app2/',
		container: app2Container,
		onMount(...args) {
			console.log(args);
		},
	};

	const fronty = await init(app1, app2);
})();
