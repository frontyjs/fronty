import { init } from '@fronty/core';
import './style.css';

(async () => {
	const app1Container = document.createElement('header');
	const app2Container = document.createElement('main');
	const app3Container = document.createElement('footer');

	document.body.appendChild(app1Container);
	document.body.appendChild(app2Container);
	document.body.appendChild(app3Container);

	const app1 = {
		id: 'app1',
		url: '/app1/',
		container: app1Container,
		onMount({ app }) {
			console.log(app);
		},
	};

	const app2 = {
		id: 'app2',
		url: '/app2/',
		container: app2Container,
		onMount({ app }) {
			console.log(app);
		},
	};

	const app3 = {
		id: 'app3',
		url: '/app3/',
		container: app3Container,
		onMount({ frame, app }) {
			console.log(app);
		},
	};

	const fronty = await init(app1, app2, app3);
})();
