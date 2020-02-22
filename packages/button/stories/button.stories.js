import React from 'react';
import { Button } from '..';
import '@material/button/dist/mdc.button.css';

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
