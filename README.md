<h1 align="center">Welcome to Forms 👋</h1>
<p>
  <a href="https://github.com/BedrockStreaming/forms/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/Bedrock_Stream" target="_blank">
    <img alt="Twitter: Bedrock_Stream" src="https://img.shields.io/twitter/follow/Bedrock_Stream.svg?style=social" />
  </a>
  <a href="https://github.com/BedrockStreaming/forms/actions/workflows/main.yml" target="_blank">
    <img alt="CI" src="https://github.com/BedrockStreaming/forms/actions/workflows/main.yml/badge.svg" />
  </a>
  <a href="https://codecov.io/gh/BedrockStreaming/forms">
    <img src="https://codecov.io/gh/BedrockStreaming/forms/branch/master/graph/badge.svg?token=073DJ56DNX"/>
  </a>
</p>

:octocat: Monorepo exposing a set of form libraries we, [BedrockStreaming](https://www.bedrockstreaming.com/), are using in our production react applications to handle dynamic forms generation and validation.
This project handles 4 librairies packages, plus the demo/demo-e2e and docsite/docsite-e2e
The `demo` project is there to smoothe the dev experience
The `docsite`project is the one used on https://bedrockstreaming.github.io/forms/

## :package: Packages

- [@bedrockstreaming/form-builder](libs/form-builder/README.md) :construction_worker:
- [@bedrockstreaming/form-validation-rule-list](libs/form-validation-rule-list/README.md) 🧑‍⚖️
- [@bedrockstreaming/form-redux](libs/form-redux/README.md) :globe_with_meridians:
- [@bedrockstreaming/form-context](libs/form-context/README.md) :globe_with_meridians:

## Why

The idea of this library came from the variety of requests our customers had in terms of forms. Thus, we wanted to be able to generate any form by simply passing some config and a dictionary of inputs to go with.
As we were eager to keep some control over the process, but not willing to control the form state ourselves, we went with [react-hook-form](https://react-hook-form.com/) which has great capabilities. Unfortunately we were missing some features that we had to implement ourselves.

- Complex validation with multiple visuals feedback (at the same time)
- Steps handling

We believe that anyone using react could use our libraries to create and manage forms the way we do. We are still exposing - what we think are - the relevant parts of `react-hook-form` API so we think of the FormBuilder as an opinionated solution to industrialize forms across your application.

## How to start

for development:
`yarn start demo``
or
`yarn start docsite``

for e2e:
`yarn e2e demo-e2e``
or
`yarn e2e docsite-e2e`

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

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/hpierre74"><img src="https://avatars.githubusercontent.com/u/25172711?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierre Huyghe</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=hpierre74" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=hpierre74" title="Code">💻</a> <a href="#example-hpierre74" title="Examples">💡</a> <a href="#maintenance-hpierre74" title="Maintenance">🚧</a> <a href="#ideas-hpierre74" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="http://slashgear.github.io/"><img src="https://avatars.githubusercontent.com/u/6263857?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antoine Caron</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=Slashgear" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=Slashgear" title="Code">💻</a> <a href="#example-Slashgear" title="Examples">💡</a> <a href="#maintenance-Slashgear" title="Maintenance">🚧</a> <a href="#ideas-Slashgear" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/fdubost"><img src="https://avatars.githubusercontent.com/u/3973818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Florent Dubost</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=fdubost" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=fdubost" title="Code">💻</a> <a href="#example-fdubost" title="Examples">💡</a> <a href="#maintenance-fdubost" title="Maintenance">🚧</a> <a href="#ideas-fdubost" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/renaudAmsellem"><img src="https://avatars.githubusercontent.com/u/5941601?v=4?s=100" width="100px;" alt=""/><br /><sub><b>renaudAmsellem</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=renaudAmsellem" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=renaudAmsellem" title="Code">💻</a> <a href="#example-renaudAmsellem" title="Examples">💡</a> <a href="#maintenance-renaudAmsellem" title="Maintenance">🚧</a> <a href="#ideas-renaudAmsellem" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/jcoquet"><img src="https://avatars.githubusercontent.com/u/26571211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jcoquet</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=jcoquet" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=jcoquet" title="Code">💻</a> <a href="#example-jcoquet" title="Examples">💡</a> <a href="#maintenance-jcoquet" title="Maintenance">🚧</a> <a href="#ideas-jcoquet" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/UltiXstorm"><img src="https://avatars.githubusercontent.com/u/53232310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>UltiXstorm</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=UltiXstorm" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=UltiXstorm" title="Code">💻</a> <a href="#maintenance-UltiXstorm" title="Maintenance">🚧</a> <a href="#ideas-UltiXstorm" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://lacruz.org/team/alves-mickael"><img src="https://avatars.githubusercontent.com/u/60877626?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alves Mickaël</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=Cruz-Azul" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=Cruz-Azul" title="Code">💻</a> <a href="#maintenance-Cruz-Azul" title="Maintenance">🚧</a> <a href="#ideas-Cruz-Azul" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/nicolasca"><img src="https://avatars.githubusercontent.com/u/2886734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Castejon</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=nicolasca" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=nicolasca" title="Code">💻</a> <a href="#maintenance-nicolasca" title="Maintenance">🚧</a> <a href="#ideas-nicolasca" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/MaximeBF2000"><img src="https://avatars.githubusercontent.com/u/46478550?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxime BOUNAAS-FERRET</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=MaximeBF2000" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=MaximeBF2000" title="Code">💻</a> <a href="#example-MaximeBF2000" title="Examples">💡</a> <a href="#maintenance-MaximeBF2000" title="Maintenance">🚧</a> <a href="#ideas-MaximeBF2000" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="http://pioupioum.fr/"><img src="https://avatars.githubusercontent.com/u/22614?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mehdi Kabab</b></sub></a><br /><a href="https://github.com/BedrockStreaming/forms/commits?author=piouPiouM" title="Documentation">📖</a> <a href="https://github.com/BedrockStreaming/forms/commits?author=piouPiouM" title="Code">💻</a> <a href="#example-piouPiouM" title="Examples">💡</a> <a href="#maintenance-piouPiouM" title="Maintenance">🚧</a> <a href="#ideas-piouPiouM" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## :memo: Licence

Copyright © 2022 [BedrockStreaming](https://github.com/BedrockStreaming).<br />
This project is [MIT](https://github.com/BedrockStreaming/forms/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
