import React from 'react';
import { CircularProgress } from '..';
import { Button } from '../../button';
import { IconButton } from '../../icon-button';
import '@material/circular-progress/dist/mdc.circular-progress.css';
import '../index.css';

export default {
  title: 'CircularProgress',
  decorators: [
    storyFn => (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

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
    <CircularProgress size="medium" />
    <CircularProgress size="small" />
    <CircularProgress size="xsmall" />
  </>
);

export const FourColors = () => (
  <>
    <CircularProgress fourColors />
    <CircularProgress size="medium" fourColors />
    <CircularProgress size="small" fourColors />
    <CircularProgress size="xsmall" fourColors />
  </>
);

export const Buttons = () => {
  const icon = <CircularProgress size="xsmall" />;
  const styles = { marginRight: '8px' };
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
  <IconButton icon={<CircularProgress size="small" />} />
);
