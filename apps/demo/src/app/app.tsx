import { Switch, Route } from 'react-router-dom';

import { Layout } from './components/app/layout.component';
import MUIForm from './examples/with-material-ui/form.component';
import { Generator as SchemaBuilder } from '@bedrockstreaming/form-editor';
import StyledForm from './examples/with-styled-components/form.component';
import { dictionary } from './examples/with-material-ui/dictionary';
import { extraValidation } from './extraValidation';

export function App() {
  return (
    <Layout>
      <main>
        <Switch>
          <Route exact path="/">
            <MUIForm />
          </Route>
          <Route exact path="/schema-builder">
            <SchemaBuilder
              dictionary={dictionary}
              extraValidation={extraValidation}
            />
          </Route>
          <Route exact path="/examples/styled-components">
            <StyledForm />
          </Route>
          <Route exact path="/examples/material-ui">
            <MUIForm />
          </Route>
        </Switch>
      </main>
    </Layout>
  );
}

export default App;
