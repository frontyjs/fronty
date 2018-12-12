import { load } from 'cheerio';

export const iframe = async ({ id, container, url, fronty, onMount = () => {} }) => {
  if (!url) {
    url = `/${id}`;
  }

  const iFrame = document.createElement('iframe');
  container.appendChild(iFrame);

  iFrame.contentWindow.fronty = fronty;
  iFrame.name = id;

  const request = await fetch(url);
  const source = await request.text();

  const $ = load(source);

  $('head').prepend($('<base />').attr('href', url + '/')).html();

  iFrame.contentDocument.open().write($.html());
  iFrame.contentDocument.close();

  iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {
    onMount({ container, fronty });
  });

  iFrame.contentWindow.addEventListener('unload', async e => {
    container.removeChild(iFrame);

    try {
      await iframe({ id, container, url, fronty });
    } catch (e) {
      console.error(e);
    }
  });
};
