import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../components';

storiesOf('Base|Button', module)
  .add('Simple', () => <Button text="test" />);