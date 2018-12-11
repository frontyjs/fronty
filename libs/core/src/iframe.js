export const iframe = async ({ id, container, url, fronty }) => {
  if (!url) {
    url = `/${id}`;
  }

  const iFrame = document.createElement('iframe');
  container.appendChild(iFrame);

  iFrame.contentWindow.fronty = fronty;
  iFrame.name = id;

  const request = await fetch(url);
  const source = await request.text();

  iFrame.contentDocument.open().write(source);
  iFrame.contentDocument.close();

  iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {});

  iFrame.contentWindow.addEventListener('unload', async e => {
    container.removeChild(iFrame);

    try {
      await iframe({ id, container, url, fronty });
    } catch (e) {
      console.error(e);
    }
  });
};
