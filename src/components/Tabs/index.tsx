import React, { Children, useState } from 'react';
import classnames from 'classnames';

import './Tabs.scss';

export interface TabsProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
  onChange?: (activeKey: string) => void;
}

export interface TabPaneProps {
  children: React.ReactNode;
  label: string|React.ReactNode;
  key: string;
}

export const Tabs = ({ children, className, defaultValue, onChange }: TabsProps) => {
  const [active, setActive] = useState(defaultValue);

  const prefixCls = classnames('nl_tabs', className);

  const handleChange = (child: any, index: number) => {
    // console.log(child, index);
    setActive(child.key);
    onChange && onChange(child.key);
  };

  const activeClass = (child: any, index: number) => {
    if (!active && index === 0) {
      setActive(child.key);
    }
    return classnames(active === child.key ? 'active' : '');
  };

  // Tabs Navs
  const tabLabel = Children.map(children, (child: React.ReactElement, index) => {
    // console.log(activeCls);
    return (
      <li
        className={activeClass(child, index)}
        onClick={() => handleChange(child, index)}
      >
        {child.props.label}
      </li>
    );
  });

  // TabPane Container
  const tabContent = Children.map(children, (child: React.ReactElement, index) => {
    return (
      <div className={activeClass(child, index)}>{child.props.children}</div>
    );
  });

  return (
    <div className={prefixCls}>
      <ul className="nl_tabs_nav">{tabLabel}</ul>
      <div className="nl_tabs_container">{tabContent}</div>
    </div>
  );
};

export const TabPane = ({ children, ...rest }: TabPaneProps) => <div {...rest}>{children}</div>;
