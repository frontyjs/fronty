import cheerio from 'cheerio';

const parseQuerystring = () =>
  new URLSearchParams(location.search.replace(/^\?/, ''));

const qsToURL = qs => {
  return '?' + qs.toString().replace(/%2F/g, '/');
};

export const iframe = async ({
  id,
  container,
  url,
  fronty,
  onMount,
  app,
  replaceElement
}) => {
  if (!url) {
    throw new Error('Must supply url for iframe');
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

  const $ = cheerio.load(source);

  $('head')
    .prepend($('<base />').attr('href', url + '/'))
    .html();

  iFrame.contentDocument.open().write($.html());
  iFrame.contentDocument.close();

  // Setup initial routing on inner app - so when loading a page such as
  // fronty/?app=url
  // The app frame would be loaded at #url
  // We fake a hashchange event so the inner framework can do its magic
  {
    const url = '#' + parseQuerystring().get(id);
    iWindow.history.replaceState({}, '', url);
    const fakeEvent = new HashChangeEvent('hashchange', {
      oldURL: '#',
      newURL: url
    });
    iWindow.location.hash = url;
    iWindow.dispatchEvent(fakeEvent);
  }

  // When changing the page inside an app, update the current url to point
  // to the correct location - fronty/?app=url
  iWindow.addEventListener('hashchange', () => {
    const hash = iWindow.document.location.hash || '#';
    if (hash.startsWith('#fronty/')) {
      // If the hash starts with fronty/, it is a commant to fronty to navigate on _other_ apps
      const [, target, ...location] = hash.split('/');
      fronty.apps.get(target).window.document.location.hash = location.join(
        '/'
      );
      console.log(`Setting url on ${target} to #${location.join('/')}`);
      iWindow.document.location.hash = '#';
      return;
    }

    const qs = parseQuerystring();
    qs.set(id, hash.substring(1));
    window.history.replaceState({}, '', qsToURL(qs));
  });

  // Support for onMount event inside apps
  iWindow.addEventListener('DOMContentLoaded', e => {
    const params = { container, fronty, app, frame: iFrame };

    onMount = onMount || iWindow.onMount;
    if (onMount) onMount(params);
  });

  // When clicking "refresh iframe" in Chrome, the unload event is dispatched
  // - we catch that to handle our own iframe-displaying semantics
  iWindow.addEventListener('unload', async e => {
    await iframe({ id, container, url, fronty, app, replaceElement: iFrame });
  });

  app.window = iWindow;
  app.iframe = iFrame;
};
