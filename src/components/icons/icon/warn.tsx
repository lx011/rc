import React from 'react';
import { SVGContainer, IconProps } from './../SVGContainer';

export const IconWarn = ({ color = '#EC9131', ...rest }: IconProps) => (
  <SVGContainer color={color} {...rest}>
    <path d="m508.928 40.277333a468.821333 468.821333 0 1 0 468.821333 468.821334 468.821333 468.821333 0 0 0 -468.821333-468.821334zm0 776.192a56.32 56.32 0 1 1 56.149333-56.149333 55.637333 55.637333 0 0 1 -56.149333 56.149333zm57.173333-221.866666a56.32 56.32 0 0 1 -112.64 0v-338.602667a56.32 56.32 0 0 1 112.64 0zm0 0" />
  </SVGContainer>
);

export default IconWarn;
