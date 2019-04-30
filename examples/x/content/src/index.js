import './style.css';

let i = 1;

document.querySelector('button').addEventListener('click', e => {
  const title = `New Menu ${i++}`;
  const url = title.toLowerCase().replace(/\s/g, '-');

  window.fronty.apps.get('header').addMenuItem({ title, url });
});

window.onMount = params => console.log(params);

(async () => {
  if (!fronty.apps.has('api')) return;
  const text = await fronty.apps.get('api').getText();

  console.log(text);
})();
