import React from 'react';
import { Icon } from '..';

export default { title: 'Icon' };

export const Material = () => <Icon icon="favorite" />;

export const FontAwesome = () => (
  <Icon icon={<i className="fas fa-ice-cream fa-2x"></i>} />
);
