import styled from 'styled-components';
import Form from './form.component';
import { ReactComponent as Logo } from './logo.svg';

const Container = styled.div`
  background: lightgrey;
  height: 100vh;
`;

export function App() {
  return (
    <Container>
      <header>
        <Logo width="75" height="75" />
        <h1>Welcome to demo!</h1>
      </header>
      <main>
        <Form />
      </main>
    </Container>
  );
}

export default App;
