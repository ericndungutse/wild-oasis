import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Raw from './ui/Raw';

const StylesApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StylesApp>
        <Raw>
          <Raw type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h2'>Check in and Check out</Heading>
              <Button variation='primary' size='medium'>
                Check in
              </Button>
              <Button variation='secondary' size='small'>
                Check out
              </Button>
            </div>
          </Raw>

          <Raw>
            <Heading as='h3'>Form</Heading>
            <form action=''>
              <Input
                type='number'
                placeholder='Number od guests...'
              />
              <Input
                type='number'
                placeholder='Number od guests...'
              />
            </form>
          </Raw>
        </Raw>
      </StylesApp>
    </>
  );
}

export default App;
