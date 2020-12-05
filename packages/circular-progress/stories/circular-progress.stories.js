import {CircularProgress} from '..';
import {Button} from '../../button';
import {IconButton} from '../../icon-button';
import '../index.scss';

export const Meta = {
  title: 'CircularProgress',
  decorators: [
    storyFn => (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};
export default Meta;

export const Basic = () => (
  <>
    <CircularProgress progress={0.25} />
    <CircularProgress progress={0.5} />
    <CircularProgress progress={0.75} />
    <CircularProgress progress={1} />
  </>
);

export const Indeterminate = () => (
  <>
    <CircularProgress />
    <CircularProgress medium />
    <CircularProgress small />
  </>
);

export const FourColors = () => (
  <>
    <CircularProgress fourColors />
    <CircularProgress medium fourColors />
    <CircularProgress small fourColors />
  </>
);

export const Buttons = () => {
  const icon = <CircularProgress small />;
  const styles = {marginRight: '8px'};
  return (
    <>
      <Button label="Basic" icon={icon} style={styles} />
      <Button label="Raised" raised icon={icon} style={styles} />
      <Button label="Unelevated" unelevated icon={icon} style={styles} />
      <Button label="Outlined" outlined icon={icon} style={styles} />
    </>
  );
};

export const IconButtons = () => (
  <IconButton icon={<CircularProgress small />} />
);
