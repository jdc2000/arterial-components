import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import './preview.scss';

addDecorator(storyFn => <div className="mdc-typography">{storyFn()}</div>);
addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
});