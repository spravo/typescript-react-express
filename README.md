# Typescript React Redux Isomorphic Hot Example.

## About
This is a starter boilerplate app I've put together using the following technologies:

- React
- React Router
- Express
- Typescript
- Webpack for bundling
- Webpack Dev Middleware
- Webpack Hot Middleware
- Redux's futuristic Flux implementation
- Support ReduxDevTools (developer experience)
- TSLint to maintain a consistent code style
- style-loader, sass-loader and autoprefixer to allow import of stylesheets in plain css, scss,
- react-helmet to manage title and meta tag information on both server and client

## Feature:
- Support docker
- Server side render + fetch data
- React hot reload
- Server render supports react hot reload
- Server does not reload after change client code

## How to use

```sh
$ npm run docker:run

# Connect to docker container
$ npm run docker:exec

# NOTE. After work you should stop container
$ npm run docker:stop
```

```sh
# Developer mode
$ npm run start

$ npm run build
$ npm run server
```

```sh
# TSLint
$ npm run tslint

# Unit test
# TODO
```

## Explanation

### Client side
The client side entry point is reasonably named client/index.ts. All it does is load the routes, initiate react-router, rehydrate the redux state from the `window.__PRELOADED_STATE__` passed in from the server, and render the page over top of the server-rendered DOM. This makes React enable all its event listeners without having to re-render the DOM.

### Server-side Data Fetching
...

### Routing and HTML return
...

## TODO:
- Storybook
- test (mocha, chai, chai-http, enzyme, sinon, jsdom)
- webpack/plugins/assetsManifest.js
- Dockerfile
