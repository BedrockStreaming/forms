import { Switch, Route } from 'react-router-dom';

import { Layout } from './components/app/layout.component';
import MUIForm from './examples/with-material-ui/form.component';
import StyledForm from './examples/with-styled-components/form.component';

export function App() {
  return (
    <Layout>
      <main>
        <Switch>
          <Route exact path="/">
            <MUIForm />
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
