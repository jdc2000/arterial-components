import React from 'react';
import { Icon } from '..';

export default { title: 'Icon' };

export const Basic = () => <Icon className="fas fa-heart" />;

export const Material = () => <Icon icon="favorite" />;

export const WithIconElement = () => (
  <Icon icon={<i className="fas fa-ice-cream fa-2x"></i>} />
);
