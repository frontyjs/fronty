const list = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Services', url: '/services' },
  { title: 'Contact Us', url: '/contact-us' }
].map(({title, url}) => `<li><a href="${url}">${title}</a></li><li class="separator"></li>`);

export default {
  name: 'header',
  type: 'js',
  onMount(el, apps) {
    el.innerHTML = `<ul class="menu">${list.join('')}</ul>`;

    apps.get('api').alert(list);
  }
};
