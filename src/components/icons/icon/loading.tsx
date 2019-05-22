import React from 'react';
import { IconProps } from './../interface';

export const IconLoading = ({ size = '1em', color = '#309EEB', className, ...rest }: IconProps) => (
  <svg
    className={`nuico rotate ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
    fill={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path d="m512.426 1023.15c278.507 0 505.024-222.592 511.424-499.563-5.91 241.685-189.675 435.605-415.51 435.606-229.547 0-415.659-200.427-415.659-447.616 0-52.971-42.944-95.936-95.915-95.936-52.95 0-95.915 42.965-95.915 95.936-.003 282.539 229.035 511.573 511.574 511.573zm.001-1023.15c-278.507 0-505.024 222.592-511.403 499.563 5.888-241.664 189.653-435.627 415.488-435.627 229.547 0 415.659 200.448 415.659 447.637 0 52.95 42.965 95.915 95.936 95.915 52.928 0 95.894-42.944 95.893-95.915 0-282.539-229.035-511.573-511.573-511.573z" />
  </svg>
);

export default IconLoading;