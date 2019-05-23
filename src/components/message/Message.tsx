import React from 'react';

import { toast } from '@comp/toast';
import { Icon } from '@comp/icons';
import { firstUpperCase } from '@utils/tools';

import { ToastProps, ToastIconType } from '../toast';


export interface MessageProps extends ToastProps {
  message: React.ReactNode;
}
// TODO: toast.config
export interface MessageAPI {
  // toast base
  // config(options: ToastConfigProps): void;
  open(args: MessageProps): void;

  // message
  openMessage(args: MessageProps): void;
  info?(args: MessageProps): void;
  warn?(args: MessageProps): void;
  error?(args: MessageProps): void;
  success?(args: MessageProps): void;
  loading?(args: MessageProps): void;
}

const messageApi: MessageAPI = {
  open: toast,
  openMessage: toastMessage,
  // config: setToastConfig,
}

function toastMessage({ type, message, ...rest }: MessageProps) {
  const MessageIcon = type && Icon[firstUpperCase(type)];
  const renderMessage = <React.Fragment><MessageIcon />{' '}{message}</React.Fragment>;
  toast({ content: renderMessage, ...rest });
}

['info', 'warn', 'error', 'success', 'loading'].forEach((type: ToastIconType) => {
  messageApi[type] = (props: MessageProps) =>
  messageApi.openMessage({
      type,
      ...props,
    })
});

export const message = messageApi;
