import cheerio from 'cheerio';

export const iframe = async ({ id, container, url, fronty, onMount, app }) => {
  if (!url) {
    url = `/${id}`;
  }

  const iFrame = document.createElement('iframe');
  container.appendChild(iFrame);

  iFrame.contentWindow.fronty = fronty;
  iFrame.name = id;

  const request = await fetch(url);
  const source = await request.text();

  const $ = cheerio.load(source);

  $('head')
    .prepend($('<base />').attr('href', url + '/'))
    .html();

  iFrame.contentDocument.open().write($.html());
  iFrame.contentDocument.close();

  iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {
    const params = { container, fronty, app, frame: iFrame };

    onMount = onMount || iFrame.contentWindow.onMount;
    if(onMount) onMount(params);
  });

  iFrame.contentWindow.addEventListener('unload', async e => {
    container.removeChild(iFrame);

    try {
      await iframe({ id, container, url, fronty, app });
    } catch (e) {
      console.error(e);
    }
  });
};
