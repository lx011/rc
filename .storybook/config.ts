import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

const logo = require('./nui.svg');

addDecorator(centered);
addDecorator(withKnobs);
// bug: https://github.com/storybooks/storybook/issues/5721
addDecorator(withInfo);

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandImage: logo,
      // colorPrimary: 'hotpink',
      // colorSecondary: 'orangered'
    }),
    showPanel: true,
    panelPosition: 'right',
  },
});

// Grep src for .story file extensions
const req = require.context('../src', true, /\.story\.tsx/);
const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);