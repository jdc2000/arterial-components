import {Fab} from '..';

export const Meta = {title: 'Fab'};
export default Meta;

function MyFab({exited, extended, hasIcon, hasTrailingIcon, mini}) {
  let icon = '';
  let label = '';
  let trailingIcon = '';
  if (extended) {
    label = 'Create';
    if (hasIcon) {
      icon = 'add';
    }
    if (hasTrailingIcon) {
      icon = '';
      trailingIcon = 'add';
    }
  } else {
    icon = 'favorite';
  }
  return (
    <Fab
      exited={exited}
      extended={extended}
      icon={icon}
      label={label}
      mini={mini}
      trailingIcon={trailingIcon}
    />
  );
}

export const Basic = () => <MyFab />;
export const Mini = () => <MyFab mini />;
export const Extended = () => <MyFab extended hasIcon />;
export const ExtendedWithTrailingIcon = () => (
  <MyFab extended hasTrailingIcon />
);
export const ExtendedWithoutIcon = () => <MyFab extended />;
export const Exited = () => <MyFab exited />;
