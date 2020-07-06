import React from 'react';
import { Button } from '..';
import { CircularProgress } from '../../circular-progress';

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
  const icon = <CircularProgress small />;
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
