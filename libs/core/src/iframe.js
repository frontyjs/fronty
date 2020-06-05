export const iframe = async ({
	id,
	container,
	url,
	fronty,
	onMount,
	app,
	replaceElement,
}) => {
	if (!url) {
		throw new Error(`Must supply url for iframe for app id ${id}`);
	}

	// Render the iframe
	const iFrame = document.createElement('iframe');
	if (replaceElement) {
		replaceElement.replaceWith(iFrame);
	} else {
		container.appendChild(iFrame);
	}

	const iWindow = iFrame.contentWindow;

	iWindow.fronty = fronty;
	iFrame.setAttribute('fronty-app-name', id);

	const request = await fetch(url);
	const source = await request.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(source, 'text/html');

	const base = document.createElement('base');
	base.setAttribute('href', url + '/');
	doc.head.prepend(base);

	const html = new XMLSerializer().serializeToString(doc);

	iFrame.contentDocument.open().write(html);
	iFrame.contentDocument.close();

	iWindow.addEventListener('load', (e) => {
		const body = iFrame.contentDocument.body,
			html = iFrame.contentDocument.documentElement;

		const height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.offsetHeight
		);

		iFrame.style.height = height + 'px';

		const params = { container, fronty, app, frame: iFrame };

		onMount = onMount || iWindow.onMount;
		if (onMount) onMount(params);
	});

	// When clicking "refresh iframe" in Chrome, the unload event is dispatched
	// - we catch that to handle our own iframe-displaying semantics
	iWindow.addEventListener('unload', async (e) => {
		await iframe({ id, container, url, fronty, app, replaceElement: iFrame });
	});

	app.window = iWindow;
	app.iframe = iFrame;
	app.container = container;
};
