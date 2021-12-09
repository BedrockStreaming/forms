import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

export const wrapped = (Component) => (props) =>
  (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
