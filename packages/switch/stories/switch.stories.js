import React, { useEffect, useState } from 'react';
import { Switch } from '..';
import '@material/switch/dist/mdc.switch.css';

export default {
  title: 'Switch',
  decorators: [
    storyFn => (
      <div style={{ paddingTop: '16px', paddingLeft: '16px' }}>{storyFn()}</div>
    )
  ]
};

function MySwitch({ alignEnd, on, withLabel }) {
  const [checked, setChecked] = useState(false);
  const label = withLabel ? 'off/on' : '';

  useEffect(() => {
    setChecked(on);
  }, [on]);

  return (
    <Switch
      alignEnd={alignEnd}
      checked={checked}
      id="my-switch"
      label={label}
      onChange={() => setChecked(!checked)}
      value="my-switch-on"
    />
  );
}
export const Basic = () => <MySwitch />;
export const On = () => <MySwitch on />;
export const WithLabel = () => <MySwitch withLabel />;
export const WithLabelAndAlignEnd = () => <MySwitch withLabel alignEnd />;