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
	Go to <a href="/about">About Us</a> page.
</p>
`;

document.body.appendChild(div);

const style = document.createElement('style');

const css = `
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
	margin: 0;
	padding: 20px;
	font: 16px Roboto;
}

p {
	color: white;
	max-width: 800px;
	margin: 0 auto 20px auto;
}

a {
	color: yellow;
}`;

style.innerText = css;

document.head.appendChild(style);

(async () => {
  if (!fronty.apps.has('api')) return;
  const text = await fronty.apps.get('api').getText();

  console.log(text);
})();
