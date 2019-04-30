# Hybrid migration

We have an existing AngularJS app, and would like to migrate to React without losing our existing work.

We create a new header in React, including menus for both AngularJS ("existing") parts and React ("new") parts.

## Compiling

Simply run `webpack` (or `yarn build`) ; it is configured to compile both the legacy and modern application, and join them into one fronty app.
