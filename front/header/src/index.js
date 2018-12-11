const list = [];

let appContainer = null;

const render = () => `<ul class="menu">${list
  .map(({ title, url }) => `<li><a href="${url}">${title}</a></li>`)
  .join('<li class="separator" />')}</ul>`;

export default {
  id: 'header',
  type: 'js',
  onMount({ container, fronty }) {
    appContainer = container;
    appContainer.innerHTML = render();

    fronty.apps.get('api').alert(list);
  },
  addMenuItem({title, url}) {
    list.push({ title, url });
    appContainer.innerHTML = render();
  }
};
