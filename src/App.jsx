import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 60px;
  color: green;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const StylesApp = styled.div`
  background-color: #f4f4f4;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StylesApp>
        <H1>The Wild Oasis</H1>
        <Button>Check in</Button>
        <Input type='text' placeholder='Number od guests...' />
      </StylesApp>
    </>
  );
}

export default App;
