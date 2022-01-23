---
id: overview
title: Overview
slug: /
---

This documentation presents a set of libraries BedrockStreaming uses to handle dynamic forms generation for its customers:

- :package: [@bedrockstreaming/form-builder](https://github.com/BedrockStreaming/forms/tree/master/libs/form-builder/README.md)
- :package: [@bedrockstreaming/form-validation-rule-list](https://github.com/BedrockStreaming/forms/tree/master/libs/form-validation-rule-list/README.md)
- :package: [@bedrockstreaming/form-redux](https://github.com/BedrockStreaming/forms/tree/master/libs/form-redux/README.md)
- :package: [@bedrockstreaming/form-context](https://github.com/BedrockStreaming/forms/tree/master/libs/form-context/README.md)

## Why would you use these libraries ?

The idea of these libraries came from the variety of requests our customers had in terms of forms. Thus, we wanted to be able to generate any form by simply passing some config and a dictionary of inputs to go with.
As we were eager to keep some control over the process, we went with [react-hook-form](https://react-hook-form.com/) which has great capabilities. Unfortunately we were missing some features that we had to implement ourselves.

- Complex validation with multiple visuals feedback
- Steps handling

## Features

Here is a list of features we are supporting :white_check_mark:

- :white_check_mark: Form Generation
- :white_check_mark: Asynchronous Custom Validation
- :white_check_mark: Multi Steps Forms
- :white_check_mark: Conditional Fields

---

Here is a list of features we will **not** support :x:

- :x: Form UI Components

---

Here is a list of features we will **probably** support :thinking:

- :construction: Conditional Steps

## Why did we have to make it ?

### Our context and needs

Bedrock provides turn-keys streaming platforms on different devices. A few years ago, we didn't have to maintain many forms for our existing AVOD platforms - mainly login and register ones - while our customers mostly shared the UX and UI of such forms. However, since we started addressing SVOD platforms and higher customization expectations, we realized we had to **industrialize** the way we were handling forms or we would end up writing custom code for every customer, which would dramatically impact our core delivery schedule.

We decided that we wanted to:

- Use our design system and existing styled-components inputs (excluding form generation libraries providing UI or html output).
- Describe our forms from serializable schemas (json), so such schema could be shared across front-ends regardless of the language or library used to built it and even come from a server response.
- Use complex validation, keeping in mind we didn't want to increase our bundle size by using a dedicated validation library (like yup or joi).
- Display as many visual hints as there are validation rules on a given input (not just one error message, each rule would show its completeness state).
- Avoid using redux (in our opinion, inputs should be uncontrolled or handling their own state locally)
- Use multi steps forms.
- Write the less code as possible. Of course.

#### A case study, looking for the right library :male_detective:

We made some research of this ideal lib that would handle both the form state and the inputs generation, but we didn't found it.
**Formik** and **react-hook-from** were top shelf candidates but were missing the generation part whereas **react-jsonschema-forms** had the schema and form generation capabilities but was lacking async validation and ease in input customization.

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
