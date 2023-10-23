import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StylesApp = styled.div`
  background-color: #f4f4f4;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StylesApp>
        <Heading as='h1'>The Wild Oasis</Heading>
        <Heading as='h2'>Checkout</Heading>
        <Button>Check in</Button>
        <Heading as='h3'>Form</Heading>
        <Input type='text' placeholder='Number od guests...' />
      </StylesApp>
    </>
  );
}

export default App;
