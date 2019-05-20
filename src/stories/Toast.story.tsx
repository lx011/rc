import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import toast from '../components/toast';

let count = 0;

const SelectPlacement = ({ options, defaultVal, onChange }: any) => {
  const handleChange = (val: any) => {
    onChange && onChange(val.currentTarget.value);
  };
  return (
    <select value={defaultVal} onChange={handleChange}>
      {options.map((item: any) => (<option key={item} value={item}>{item}</option>))}
    </select>
  );
};

const Messages = () => {
  const [placement, setPlacement] = useState('bottomCenter');
  const [messageType, setMessageType] = useState('info');
  const [maxCount, setMaxCount] = useState(1);

  const handleClick = () => {
    console.log(111);
    count += 1;
    toast[messageType]({
      getContainer: () => document.getElementById('toast__message'),
      // eslint-disable-next-line react/jsx-one-expression-per-line
      message: <b>skaslks - {count}</b>,
      maxCount,
      placement,
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
      <div>
        <b>placement</b>
        {' : '}
        <SelectPlacement
          defaultVal={placement}
          options={['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']}
          onChange={(val: any) => setPlacement(val)}
        />
      </div>
      <div>
        <b>message type</b>
        {' : '}
        <SelectPlacement
          defaultVal={messageType}
          options={['info', 'warn', 'error', 'success', 'loading']}
          onChange={(val: any) => setMessageType(val)}
        />
      </div>
      <div>
        <b>message max count</b>
        {' : '}
        <input type="text" value={maxCount} onChange={(val: any) => setMaxCount(val.target.value)} />
      </div>
      <button type="button" onClick={handleClick}>Open the message box</button>
    </>
  );
};

storiesOf('Feedback|toast', module)
  .add('basic', () => <Messages />);
