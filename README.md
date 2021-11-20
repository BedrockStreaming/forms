<h1 align="center">Welcome to Forms 👋</h1>
<p>
  <a href="https://github.com/hpierre74/forms/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/Bedrock_Stream" target="_blank">
    <img alt="Twitter: Bedrock_Stream" src="https://img.shields.io/twitter/follow/Bedrock_Stream.svg?style=social" />
  </a>
  <a href="https://github.com/hpierre74/forms/actions/workflows/main.yml" target="_blank">
    <img alt="CI" src="https://github.com/hpierre74/forms/actions/workflows/main.yml/badge.svg" />
  </a>
</p>

:octocat: Monorepo exposing a set of form libraries we, [BedrockStreaming](https://www.bedrockstreaming.com/), are using in our react applications to handle dynamic forms generation and validation.

## Why

The idea of this library came from the variety of requests our customers had in terms of forms. Thus, we wanted to be able to generate any form by simply passing some config and a dictionary of inputs to go with.
As we were eager to keep some control over the process, we went with [react-hook-form](https://react-hook-form.com/) which has great capabilities. Unfortunately we were missing some features that we had to implement ourselves.

- Complex validation with multiple visuals feedback
- Steps handling

## :package: Packages

- ⚛️ [@bedrockstreaming/form-builder](libs/form-builder/README.md) :construction_worker:
- ⚛️ [@bedrockstreaming/form-validation-rule-list](libs/form-validation-rule-list/README.md) 🧑‍⚖️
- :convenience_store: [@bedrockstreaming/form-redux](libs/form-redux/README.md)

## :railway_track: Road map

### :rocket: v1

#### Must Have

- [ ] Unit tests
- [ ] Sound types
- [ ] Demo with vanilla css and styled-components
- [ ] Demo with react-provider and redux
- [ ] Finish readmes

#### Nice to Have

- [ ] E2e tests

## 🤝 Contributing

First read the [Contributing](.github/CONTRIBUTING.md) and [Code of conduct](.github/CODE_OF_CONDUCT.md) sections.

:point_up: Note that this project was generated using [Nx](https://nx.dev).

### Generate an application

Run `yarn nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `yarn nx g @nrwl/react:lib my-lib` to generate a react library.
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

## 👥 Authors

TODO: add links to twitter/github

- Florent Dubost
- Antoine Caron
- Mehdi Kabab
- Maxime Bounaas-Ferret
- Renaud Amsellem
- Guillaume Trémé
- Nicolas Castejon
- François Jacquier
- Jean Baptiste Coquet
- Pierre Huyghe

## :memo: Licence

// TODO
