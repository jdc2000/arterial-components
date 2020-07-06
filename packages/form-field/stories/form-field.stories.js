import React, { useState } from 'react';
import { FormField } from '..';
import { Checkbox } from '../../checkbox';

export default { title: 'FormField' };

export const Basic = () => {
  const [checked, setChecked] = useState(false);
  return (
    <FormField>
      <Checkbox
        id="checkbox-1"
        value="checkbox-1"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor="checkbox-1">Checkbox 1</label>
    </FormField>
  );
};

export const AlignEnd = () => {
  const [checked, setChecked] = useState(false);
  return (
    <FormField alignEnd>
      <Checkbox
        id="checkbox-1"
        value="checkbox-1"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor="checkbox-1">Checkbox 1</label>
    </FormField>
  );
};
