import { FormsProvider } from '@bedrockstreaming/form-context';
import Form from '../login/form.component';

export const FormContainer = () => {
  return (
    <FormsProvider>
      <Form />
    </FormsProvider>
  );
};
