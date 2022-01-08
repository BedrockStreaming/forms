# Nx, your monorepo manager :man_shrugging:

> Next generation build system with first class monorepo support and powerful integrations.

It's preferable that you spend some time reading the real [docs](https://nx.dev). However, the following section will give you a grasp of Nx.

## DX, maintainability at scales

Maintaining several applications and libraries in a monorepo is never "trivial". Nx provide some features to ease our pain.

### CLI all the things

Nx comes with automation and industrialization in mind, both core and plugin packages are offering generators (`nx generate ...`) and/or executors (`nx run ...`). You can create custom generators and executors and even extend existing one.

### Dependency graph and affected commands

The core feature of Nx is that it understand the dependency between your libraries and applications. It generates a dependency graph (that you can see for your personal knowledge) used under the hood by the **affected** command (`nx affected:build`,`nx affected:test` etc...). This command is very useful since it will only trigger the applications and libraries commands that are dependant of the changes. Saving you CI time and helping understand better the impact of your changes.

### No more versions conflict

One package.json to rule them all :ring:

When building your package, Nx knows which external libraries it depends on and adds it to its generated package.json.

### Useful defaults

Though its opinionated, Nx follows the industry standards to provide some useful default presets.
For instance, when you generate a react application, it comes with jest / react-testing-library and cypress.
You can also choose between bare css, styled-components, tailwind and so on.

To make a long story short, less time on setup, more time to code.

### Everything is a library

Nx philosophy also lays in domain segregation. Everything should be thought as an external reusable library. Apps are seen as shells where you can use your shared core logic and specifics.

Imagine two identical apps built with different frameworks, all the business logic could be shared.

## Caveats

Of course, every monorepo solution has caveats, and Nx goodness comes at a cost.

### React majors

Since we use builders and executors from `@nrwl/react`, we can't move on higher versions until the Nx community or team has updated their packages accordingly.

We are dependant: meh !

### Enforced directory structure

It's not really a caveat per-se but Nx expects a particular repository structure.
One obvious downside if you are migrating your application is to re-apply your custom build logic inside Nx's paradigm. Possible but daunting.

### Learning curve

If you are sticking to the defaults, Nx will not require much knowledge to develop your apps and libraries.

However, Nx API is quite extensive, you can achieve pretty much anything from code generation, to build possibilities (you can even use Go) but it is hard to wrap your head about the internal functioning of Nx.

Diving in the code is hard, especially since Nx and a lot of plugins are written in Rxjs.

### Some weird errors

Errors are not always easy to understand due to our lack of knowledge of Nx's internals. If the error is not well formulated, you might not understand easily where the heck it came from.
