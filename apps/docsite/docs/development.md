---
id: development
title: Development
---

First read the [Contributing](https://github.com/BedrockStreaming/forms/tree/master/.github/CONTRIBUTING.md) and [Code of conduct](https://github.com/BedrockStreaming/forms/tree/master/.github/CODE_OF_CONDUCT.md) sections.

:point_up: Note that this project was generated using [Nx](https://nx.dev).

## Development workflow

There are two applications in this NX workspace `demo` and `docsite`. We are using a _dogfooding_ strategy, implementing every features in those apps so we can functionally test it and provide working examples at the same time to our users.

Start the server

```bash
pnpm start demo
```

Then start editing the libraries and demo app.

:warning: You must add unit tests to the libraries and you can optionally add e2e tests through cypress on the demo app.

:warning: Everything must be documented on both **workspace**, **libs** and **apps** `README.md` files as well as on the `docsite` corresponding docs.

## About NX

### Generate an application

Run `pnpm nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `pnpm nx g @nrwl/react:lib my-lib` to generate a react library.
Run `yarn nx g @nrwl/react:web my-lib` to generate a web library.
Run `yarn nx g @nrwl/react:node my-lib` to generate a node library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@forms/mylib`.

If you want the library to be publishable use:

```bash
yarn nx g @nrwl/react:lib my-lib --publishable --importPath="@bedrockstreaming/form-foo"
```

### Development server

Run `yarn nx serve my-app` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `yarn nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `yarn nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `yarn nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `yarn nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `yarn nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `yarn nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `yarn nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
