import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Button';

storiesOf('Base|Button', module)
  .add('Simple', () => <Button />);