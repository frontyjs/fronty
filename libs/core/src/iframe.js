export const iframe = async ({
	id,
	container,
	url,
	fronty,
	onMount,
	app,
	replaceElement,
}) =>
	new Promise(async (resolve, reject) => {
		if (!url) {
			return reject(`Must supply url for iframe for app id ${id}`);
		}

		// Render the iframe
		const iFrame = document.createElement('iframe');
		iFrame.height = 0;

		if (replaceElement) {
			replaceElement.replaceWith(iFrame);
		} else {
			container.appendChild(iFrame);
		}

		iFrame.setAttribute('fronty-app-name', id);

		const request = await fetch(url);
		const source = await request.text();

		iFrame.addEventListener('load', (e) => {
			const iWindow = iFrame.contentWindow;
			iWindow.fronty = fronty;

			app.window = iWindow;
			app.iframe = iFrame;
			app.container = container;

			const html = iWindow.document.documentElement;
			const body = iWindow.document.body;

			const width = Math.max(
				body.scrollWidth,
				body.offsetWidth,
				html.offsetWidth,
				html.scrollWidth
			);

			const height = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.offsetHeight,
				html.scrollHeight
			);

			iFrame.width = width;
			iFrame.height = height;

			// When clicking "refresh iframe" in Chrome, the unload event is dispatched
			// - we catch that to handle our own iframe-displaying semantics
			iWindow.addEventListener('unload', async (e) => {
				await iframe({
					id,
					container,
					url,
					fronty,
					app,
					replaceElement: iFrame,
				});
			});

			const params = { container, fronty, app: { id, ...app } };

			onMount = onMount || iWindow.onMount;
			if (onMount) onMount(params);

			resolve();
		});

		const parser = new DOMParser();
		const doc = parser.parseFromString(source, 'text/html');

		const base = document.createElement('base');
		base.setAttribute('href', url + '/');
		doc.head.prepend(base);

		const html = new XMLSerializer().serializeToString(doc);

		const textArea = document.createElement('textArea');
		textArea.innerHTML = html;

		iFrame.contentDocument.open().write(textArea.value);
		iFrame.contentDocument.close();
	});
