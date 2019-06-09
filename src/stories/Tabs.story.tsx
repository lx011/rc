import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, TabPane } from '../components';

storiesOf('Data Display|Tabs', module)
  .add('Simple', () => (
    <Tabs defaultValue="b">
      <TabPane label="tab-1" key="a">content-1</TabPane>
      <TabPane label="tab-2" key="b">content-2</TabPane>
      <TabPane label="tab-3" key="c">content-3</TabPane>
    </Tabs>
  ));