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

  const iWindow = iFrame.contentWindow;

  // Setup initial routing on inner app - so when loading a page such as
  // fronty/?app=url
  // The app frame would be loaded at #url
  // We fake a hashchange event so the inner framework can do its magic
  {
    const url = parseQuerystring().get(name);
    iWindow.history.replaceState({}, '', '#' + url);
    const fakeEvent = new HashChangeEvent('hashchange', {
      oldURL: '#' + url,
      newURL: '#' + url
    });
    iWindow.location.hash = url;
    iWindow.dispatchEvent(fakeEvent);
  }

  // When changing the page inside an app, update the current url to point
  // to the correct location - fronty/?app=url
  iWindow.addEventListener('hashchange', () => {
    console.log('onhashchange');
    const hash = iWindow.document.location.hash || '#';
    const qs = parseQuerystring();
    qs.set(name, hash.substring(1));
    window.history.replaceState({}, '', qsToURL(qs));
  });

  // Support for onMount event inside apps
  iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {
    const params = { container, fronty, app, frame: iFrame };

    onMount = onMount || iFrame.contentWindow.onMount;
    if (onMount) onMount(params);
  });

  // When clicking "refresh iframe" in Chrome, the unload event is dispatched
  // - we catch that to handle our own iframe-displaying semantics
  iFrame.contentWindow.addEventListener('unload', async e => {
    await iframe({ id, container, url, fronty, app, replaceElement: iFrame });
  });
};
