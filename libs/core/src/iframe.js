export const iframe = async ({ container, url, apps }) => {
	if(!url) return;

	const iFrame = document.createElement('iframe');
	container.appendChild(iFrame);

	iFrame.contentWindow.fronty = { apps };

	const request = await fetch(url);
	const source = await request.text();

	iFrame.contentDocument.open().write(source);
	iFrame.contentDocument.close();

	iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {});

	iFrame.contentWindow.addEventListener('unload', async e => {
		container.removeChild(iFrame);

		try {
			await iframe({ container, url, apps });
		} catch (e) {
			console.error(e);
		}
	});
};
