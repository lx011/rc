export * from './interface';
import './icon.scss';

// icons
import { IconError } from './icon/error';
import { IconInfo } from './icon/info';
import { IconLoading } from './icon/loading';
import { IconSuccess } from './icon/success';
import { IconWarn } from './icon/warn';

export const Icon = {
  Error: IconError,
  Info: IconInfo,
  Loading: IconLoading,
  Success: IconSuccess,
  Warn: IconWarn,
};

export default Icon;
