import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs/react';

import { message } from '../components/message';

let count = 0;

const Messages = () => {
  // toast placement
  const placementOpts = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'];
  const placement = select('Placement', placementOpts, 'topLeft');

  // toast message type
  const messageOpts = ['info', 'warn', 'error', 'success', 'loading'];
  const messageType = select('MessageType', messageOpts, 'info');

  // toast max count
  const maxCount = number('MaxCount', 1, { range: false, min: 1, max: 8, step: 1 });
  const duration = number('Duration / ms', 2000);

  // TODO
  // toast.config({
  //   getContainer: () => document.getElementById('toast__message'),
  //   placement,
  //   maxCount,
  //   duration,
  //   top: 30,
  //   // bottom: 24,
  // });

  const handleClick = () => {
    count += 1;
    message[messageType]({
      getContainer: () => document.getElementById('toast__message'),
      placement,
      maxCount,
      duration,
      message: <b>message::{count}</b>,
      // onUndo: () => {
      //   alert(111);
      // },
      // undoIcon: () => '撤销',
      // onClose: () => {},
    });
  };
  return (
    <>
      <div id="toast__message" />
      <button onClick={handleClick}>Open the message box</button>
    </>
  );
};

storiesOf('Feedback|message', module)
  .add('basic', () => <Messages />);
