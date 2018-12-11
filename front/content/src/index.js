import './style.css';

const div = document.createElement('div');
div.innerHTML = `
<p>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dignissimos dolorem eius facilis fuga in neque nihil nulla officia optio praesentium, provident quidem quod ratione, rem reprehenderit, tempore temporibus voluptas?
</p>

<p>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda dolorem doloremque ea eos est illo incidunt labore, molestias nesciunt odit, quam saepe sapiente temporibus voluptatum. Eius excepturi nisi recusandae?
</p>

<p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis dolores est harum ipsa molestias perspiciatis, quia voluptatum! At cupiditate eum iusto nemo odio quam recusandae saepe velit voluptas voluptate!
</p>
<p>
	<button>Add Menu Item</button>
</p>
`;

document.body.appendChild(div);
const button = document.querySelector('button');
button.addEventListener('click', e => {
  window.fronty.apps.get('header').addMenuItem({ title: 'New Menu', url: '/new-menu-item' });
});

(async () => {
  if (!fronty.apps.has('api')) return;
  const text = await fronty.apps.get('api').getText();

  console.log(text);
})();
