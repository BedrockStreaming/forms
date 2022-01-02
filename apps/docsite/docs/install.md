---
id: install
title: Install
---

## Basic

:::note

By default, you'll always need `@bedrockstreaming/form-builder` installed, it exports the **FormBuilder** component which will render any form you want in your application.

:::

```sh
npm install @bedrockstreaming/form-builder
```

## Managing the Form Steps

:::tip

You only need state to handle the steps, you can use a solution as simple as **useState** to provide the next step callback and the currentStepIndex

:::

Using redux

```sh
npm install @bedrockstreaming/form-redux
```

<!-- Redux toolkit

```sh
npm install @bedrockstreaming/form-redux-slice
``` -->

## Adding multiple visual validations feedbacks

:::note

You probably don't need it if displaying one validation error at a time is ok for you, you already get the `react-hook-form` **errors** props in each of your dictionary fields.

:::

```sh
npm install @bedrockstreaming/form-validation-rule-list
```
