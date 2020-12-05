import {LinearProgress} from '..';

export const Meta = {title: 'LinearProgress'};
export default Meta;

export const Basic = () => (
  <LinearProgress label="Progress bar" progress={0.5} />
);

export const Buffered = () => (
  <LinearProgress buffer={0.75} label="Progress bar" progress={0.5} />
);

export const Indeterminate = () => (
  <LinearProgress indeterminate label="Progress bar" />
);

export const Reversed = () => (
  <LinearProgress label="Progress bar" progress={0.5} reversed />
);

export const ReversedBuffered = () => (
  <LinearProgress buffer={0.75} label="Progress bar" progress={0.5} reversed />
);
