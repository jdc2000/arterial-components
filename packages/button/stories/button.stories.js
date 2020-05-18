import React from 'react';
import { Button } from '..';
import { CircularProgress } from '../../circular-progress';
import '@material/button/dist/mdc.button.css';
import '@material/circular-progress/dist/mdc.circular-progress.css';

export default { title: 'Button' };

function MyButtons({ raised, unelevated, outlined }) {
  const style = { margin: '0 8px' };
  return (
    <>
      <Button
        label="Button"
        raised={raised}
        unelevated={unelevated}
        outlined={outlined}
        style={style}
      />
      <Button
        label="Icon"
        raised={raised}
        unelevated={unelevated}
        outlined={outlined}
        icon="favorite"
        style={style}
      />
      <Button
        label="Trailing Icon"
        raised={raised}
        unelevated={unelevated}
        outlined={outlined}
        trailingIcon="favorite"
        style={style}
      />
    </>
  );
}

export const Basic = () => <MyButtons />;
export const Raised = () => <MyButtons raised />;
export const Unelevated = () => <MyButtons unelevated />;
export const Outlined = () => <MyButtons outlined />;
export const Progress = () => {
  const icon = <CircularProgress size="xsmall" />;
  const styles = { marginRight: '8px' };
  return (
    <>
      <Button label="Text" icon={icon} style={styles} />
      <Button label="Raised" raised icon={icon} style={styles} />
      <Button label="Unelevated" unelevated icon={icon} style={styles} />
      <Button label="Outlined" outlined icon={icon} style={styles} />
    </>
  );
};
