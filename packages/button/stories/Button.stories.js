import React from 'react';
import { Button } from '..';
import '@material/button/dist/mdc.button.css';

export default { title: 'Button' };

function Buttons({ ripple = true }) {
  const style = { margin: '0 8px' };
  return (
    <>
      <Button label="Basic" ripple={ripple} style={style} />
      <Button label="Raised" ripple={ripple} raised style={style} />
      <Button label="Unelevated" ripple={ripple} unelevated style={style} />
      <Button label="Outlined" ripple={ripple} outlined style={style} />
      <Button
        label="Icon"
        ripple={ripple}
        outlined
        icon={<i className="material-icons">favorite</i>}
        style={style}
      />
      <Button
        label="Trailing Icon"
        ripple={ripple}
        outlined
        trailingIcon={<i className="material-icons">favorite</i>}
        style={style}
      />
    </>
  );
}

export const WithRipple = () => <Buttons />;

export const WithoutRipple = () => <Buttons ripple={false} />;
