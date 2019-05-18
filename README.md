<p align="center"><img src="https://raw.githubusercontent.com/frontyjs/fronty/assets/Fronty-logo-design-grey-version.png" width="50%" /></p>

# fronty
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

> A set of tools designed to orchestrate micro-frontend apps

![Example](https://github.com/frontyjs/fronty/blob/assets/todos.gif)

## Abstract

Fronty was designed in mind to help teams using microservices approach composing their UI layer the same as they are developing their backend services.

Consider a team that is developing a Product microservices who represent a product entity in an ecommerce solution.
The team also want to supply only their UI part, who is complient with the Product spec, and not depend on another frontend team to develop it.

In microservices we have a pattern called [Server-side page fragment composition](http://microservices.io/patterns/ui/server-side-page-fragment-composition.html), so that team can supply only their fragment dealing only with their microservice.

Fronty will help to compose a SPA experience front-end solution, collection all the neccesary fragments from our microservices.

## Installation

NPM:
```bash
npm install @fronty/core
```

Yarn:
```bash
yarn add @fronty/core
```

Script tag:

```html
<script src="https://unpkg.com/@fronty/core@latest/dist/fronty.min.js" />
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://www.ronin.co.il"><img src="https://avatars2.githubusercontent.com/u/846044?v=4" width="100px;" alt="Alon Valadji"/><br /><sub><b>Alon Valadji</b></sub></a><br /><a href="#ideas-alonronin" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/frontyjs/fronty/commits?author=alonronin" title="Code">💻</a></td><td align="center"><a href="http://confi.gurator.com"><img src="https://avatars3.githubusercontent.com/u/671365?v=4" width="100px;" alt="Dor Kleiman"/><br /><sub><b>Dor Kleiman</b></sub></a><br /><a href="#ideas-configurator" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/frontyjs/fronty/commits?author=configurator" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
