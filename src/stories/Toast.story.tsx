import React from 'react';
import { storiesOf } from '@storybook/react';

import { toast } from '../components/toast';

const Toast = () => {
  const handleClick = () => {
    toast({
      content: (
        <>
          <h1>Note:</h1>
          <p><b>test:</b> hello toast</p>
        </>
      ),
      duration: 5000,
    });
  };
  return <button onClick={handleClick}>Open the toast box</button>
}

storiesOf('Feedback|toast', module)
  .add('basic', () => <Toast />);
