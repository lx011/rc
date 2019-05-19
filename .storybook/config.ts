import { configure, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';

const logo = require('./nui.svg');

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandImage: logo,
      // colorPrimary: 'hotpink',
      // colorSecondary: 'orangered'
    }),
    showPanel: false,
    panelPosition: 'right',
  },
});

// Grep src for .story file extensions
const req = require.context('../src', true, /\.story\.tsx/);
const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);