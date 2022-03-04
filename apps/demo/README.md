<h1 align="center">Demo app 👋</h1>

<h2>The purpose of this demo app is to show one way of using the following libraries: form-builder, form-editor, form-context, form-redux, form-validation-rule-list</h2>

### How to start the demo

`yarn start demo`

### Current demo features

The default page / shows a Register Form with redux using Material UI.

You can have two different from config available right now:
- a register.config.ts in src/app
- a login.config.ts in src/app
You can find 3 links in the navigation top bar. 

#### Link Styled Components

This page doesn't use any UI library.
It's a multi-step register form component done with Styled Components.
It uses the register.config.ts to work.

#### Link Material UI

This page uses Material UI system and shows:
- a register form using React Redux
- a login form using React Context API

#### Link Schema Builder

This page allows you 
- to upload existing scheme or dictionary or extra-validation objects.
- to generate your form schema by adding steps and fields with all the necessary parameters
