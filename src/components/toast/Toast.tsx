import React from 'react';
import ReactDOM from 'react-dom';
// import InfoIcon from './../icons/info';
// import InfoIcon from './../icons/info';

export type ToastPlacement = 'topLeft'|'topCenter'|'topRight'|'bottomLeft'|'bottomCenter'|'bottomRight';
export type ToastPosition = 'top'|'left'|'right'|'bottom';
export type IconType = 'info'|'warn'|'error'|'success'|'loading';

export interface BaseToastContainerProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  readonly type?: IconType;
  maxCount?: number;
  duration?: number;
  placement?: ToastPlacement;
  getContainer?: () => HTMLElement;
  onUndo?: () => void;
  onClose?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  closeIcon?: React.ReactNode;
  undoIcon?: React.ReactNode;
}

// export interface ToastConfigProps {
//   top?: number|string;
//   bottom?: number|string;
//   left?: number|string;
//   right?: number|string;
//   duration?: number;
//   maxCount?: number;
//   placement?: ToastPlacement;
//   getContainer?: () => HTMLElement;
// }

export interface MessageProps extends BaseToastContainerProps {
  message: React.ReactNode;
}

// tslint:disable-next-line:prefer-const
// let toastConfig: ToastConfigProps = {
//   top: 24,
//   bottom: 'unset',
//   left: 24,
//   right: 'unset',
//   maxCount: 1,
//   duration: 3000,
//   placement: 'topLeft',
//   getContainer: () => document.body,
// };

function BaseToastContainer({
  content,
  onUndo,
  onClose,
  onPause,
  onResume,
  undoIcon = '[⟳]',
  closeIcon = '[✕]',
}: BaseToastContainerProps) {
  const handleUndo = () => {
    onUndo && onUndo();
  };
  const handlePause = () => {
    onPause && onPause();
  };
  const handleResume = () => {
    onResume && onResume();
  };
  return (
    <div onMouseEnter={handlePause} onMouseLeave={handleResume}>
      {content}
      {onUndo && <span className="undo" onClick={handleUndo}>{undoIcon}</span>}
      {onClose && <span className="close" onClick={handleUndo}>{closeIcon}</span>}
    </div>
  );
}

const uuid = (): string => (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);

let TOAST_ID = uuid();
let timer: any = null;
const allToast: HTMLElement|any = [];

// toast root container create
const rootContainer: any = document.createElement('div');
rootContainer.id = 'toast__root';
const spanContainer = document.createElement('span');
spanContainer.classList.add('toast__root__container');
rootContainer.appendChild(spanContainer);
const toastPrefixCls = '#toast__root .toast__root__container';

// toast(#toast__root) placement style
const placementStyle = (position: ToastPosition, num: number|string) => rootContainer.style[position] = num;
function renderPlacement(placement: ToastPlacement) {
  rootContainer.style = {
    top: 'unset',
    left: 'unset',
    right: 'unset',
    bottom: 'unset',
    transform: 'unset',
  };

  switch (placement) {
    case 'topLeft':
      placementStyle('top', 0);
      placementStyle('left', 0);
      break;
    case 'topCenter':
      placementStyle('top', 0);
      placementStyle('left', '50%');
      rootContainer.style.transform = 'translate(-50%, 0)';
      break;
    case 'topRight':
      placementStyle('top', 0);
      placementStyle('right', 0);
      break;
    case 'bottomLeft':
      placementStyle('bottom', 0);
      placementStyle('left', 0);
      break;
    case 'bottomCenter':
      placementStyle('bottom', 0);
      placementStyle('left', '50%');
      rootContainer.style.transform = 'translate(-50%, 0)';
      break;
    case 'bottomRight':
      placementStyle('bottom', 0);
      placementStyle('right', 0);
      break;
    default:
      break;
  }
}

function BaseToast({
  content,
  getContainer,
  maxCount = 1,
  duration = 3000,
  placement = 'bottomCenter',
  ...rest
}: BaseToastContainerProps) {
  // const { placement, getContainer, maxCount, duration } = toastConfig;
  const TOAST_ITEM_ID = `toast__item__${TOAST_ID}`;
  let rootNode = document.querySelector(toastPrefixCls);
  let toastItem: any = document.getElementById(TOAST_ITEM_ID);

  const isTop = /top/ig.test(placement!);
  const itemAni = isTop ? 'Top' : 'Bottom';
  renderPlacement(placement!);

  if (!rootNode) {
    const root = (typeof getContainer === 'function' && getContainer()) || document.body;
    root.appendChild(rootContainer);
    rootNode = document.querySelector(toastPrefixCls);
  }

  if (!toastItem) {
    toastItem = document.createElement('div');
    toastItem.id = TOAST_ITEM_ID;
    toastItem.classList.add('toast__item', `fade${itemAni}In`);
  }

  const removeChid = (type: string) => {
    if (allToast.length > 0) {
      const removeEl = allToast[0];
      removeEl.classList.add(`fade${itemAni}Out`);
      const removeNode = () => {
        rootNode && rootNode.removeChild(allToast[0]);
        allToast.shift();
      }
      type === 'force'
        ? removeNode()
        : setTimeout(removeNode, 300)
    }
  };

  // toast max count
  if (allToast.length >= maxCount!) {
    removeChid('force');
  } else {
    timer = null;
  }

  TOAST_ID = uuid();
  let remaining: number;
  const start = Date.now();
  clearTimeout(timer);
  remaining = duration!;

  const handleOnPause = () => {
    // console.info('Pause');
    clearTimeout(timer);
    remaining -= Date.now() - start;
  };
  const handleOnResume = () => {
    // console.info('Init/Resume');
    timer = setTimeout(() => {
      removeChid('auto');
    }, remaining);
  };
  handleOnResume();

  const toastProps = {
    content,
    onPause: handleOnPause,
    onResume: handleOnResume,
    ...rest,
  };
  ReactDOM.render(<BaseToastContainer {...toastProps} />, toastItem)
  if (rootNode) {
    allToast.push(toastItem);
    rootNode.appendChild(toastItem);
  }
}

// function setToastConfig(options: ToastConfigProps) {
//   Object.keys(options).forEach(key => {
//     if (key !== undefined && key in toastConfig) {
//       toastConfig[key] = options[key];
//     }
//   })
// }

const api = {
  open: BaseToast,
  openMessage: noticeBase,
  // config: setToastConfig,
}

function noticeBase({ type, message, ...rest }: MessageProps) {
  const Icon = require(`./../icons/${type}`).default;
  const renderMessage = <React.Fragment><Icon />{' '}{message}</React.Fragment>;
  BaseToast({ content: renderMessage, ...rest });
}

['info', 'warn', 'error', 'success', 'loading'].forEach((type: IconType) => {
  api[type] = (props: MessageProps) =>
    api.openMessage({
      type,
      ...props,
    })
});

// TODO: toast.config
export interface ToastAPI {
  // toast base
  // config(options: ToastConfigProps): void;
  open(args: MessageProps): void;

  // message
  info(args: MessageProps): void;
  warn(args: MessageProps): void;
  error(args: MessageProps): void;
  success(args: MessageProps): void;
  loading(args: MessageProps): void;
  openMessage(args: MessageProps): void;
}

export default api as ToastAPI;