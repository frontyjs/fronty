import { register, fronty } from '@fronty/core';
import './style.css';

const headerApp = {
	id: 'header',
	onMount({ app }) {
		console.log(app);
	},
};

register(headerApp);

window.addEventListener('fronty.autoinit', (e) => {
	console.log('Fronty Auto Initiated', e, fronty);
});
