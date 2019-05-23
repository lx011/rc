import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from '../components';

storiesOf('Base|Icon', module)
  .add('basic', () => (
    <div>
      <Icon.Error />
      <Icon.Info />
      <Icon.Success />
      <Icon.Warn />
      <Icon.Loading />
    </div>
  ));