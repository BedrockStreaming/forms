import { Routes, Route } from 'react-router-dom';
import { Generator as SchemaBuilder } from '@bedrockstreaming/form-editor';

import { Layout } from './components/app/layout.component';
import { FormContainer } from './examples/with-material-ui/login/form.container';
import MUIRegisterForm from './examples/with-material-ui/register/form.component';
import StyledForm from './examples/with-styled-components/form.component';
import { REDUX_DICTIONARY as dictionary } from './examples/with-material-ui/dictionary';
import { extraValidation } from './extraValidation';

export function App() {
  return (
    <Layout>
      <main>
        <Routes>
          <Route path="/" element={<MUIRegisterForm />} />
          <Route
            path="/schema-builder"
            element={<SchemaBuilder dictionary={dictionary} extraValidation={extraValidation} />}
          />
          <Route path="/examples/styled-components" element={<StyledForm />} />
          <Route
            path="/examples/material-ui"
            element={
              <>
                <MUIRegisterForm />
                <FormContainer />
              </>
            }
          />
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
