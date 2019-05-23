import React, { SVGAttributes } from 'react';
import classnames from 'classnames';

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}

export const SVGContainer = ({ size = '1em', color = 'currentColor', className, children, ...rest }: IconProps) => (
  <svg
    className={classnames('nuico', className)}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
    fill={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export default SVGContainer;
