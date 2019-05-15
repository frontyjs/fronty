# fronty

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
