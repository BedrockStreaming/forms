# :writing_hand: form-editor

:construction: **WIP** :construction:

This utility package helps to create and edit your form-builder schemas.

## :building_construction: Install

```bash
npm install @bedrockstreaming/form-editor
```

## :rocket: Usage

```jsx
import { FormEditor } from '@bedrockstreaming/form-editor';

// NOTE: Those are optionals
import { schema } from './path_to/schema';
import { dictionary } from './path_to/dictionary';
import { extraValidation } from './path_to/extraValidation';

const SomePage = () => {
  return (
    <div>
      <FormEditor
        schema={schema}
        dictionary={dictionary}
        extraValidation={extraValidation}
      />
    </div>
  );
};
```

## Examples

For real-world usage, see the [demo](../../apps/demo) app.

## Contributing

### Running unit tests

Run `nx test form-editor` to execute the unit tests via [Jest](https://jestjs.io).
