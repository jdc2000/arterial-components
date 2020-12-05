import {Icon} from '..';

export const Meta = {title: 'Icon'};
export default Meta;

export const Material = () => <Icon icon="favorite" />;

export const FontAwesome = () => (
  <Icon icon={<i className="fas fa-ice-cream fa-2x"></i>} />
);
