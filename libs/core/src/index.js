const apps = new Map();

const register = ({ name, ...options }) => {
  return apps.set(name, options);
};

const init = async () => {
  for (const [name, options] of apps) {
    const container = document.getElementById(name);
    const { url, type } = options;

    if (type === 'js') {
      console.log('js type', name, options);
      options.onMount(container, apps);
    }

    if (url && type === 'iframe') {
      try {
        await iframe({ container, url });
      } catch (e) {
        console.error(e);
      }
    }
  }
};

const iframe = async ({ container, url }) => {
  if(!url) return;

  const iFrame = document.createElement('iframe');
  container.appendChild(iFrame);

  iFrame.contentWindow.apps = apps;

  const request = await fetch(url);
  const source = await request.text();

  iFrame.contentDocument.open().write(source);
  iFrame.contentDocument.close();

  iFrame.contentWindow.addEventListener('DOMContentLoaded', e => {});

  iFrame.contentWindow.addEventListener('unload', async e => {
    container.removeChild(iFrame);

    try {
      await iframe({ container, url });
    } catch (e) {
      console.error(e);
    }
  });
};

export { register, init, apps };
