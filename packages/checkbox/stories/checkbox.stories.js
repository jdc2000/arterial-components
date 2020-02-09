import React, { useState } from 'react';
import { Checkbox } from '..';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';

export default { title: 'Checkbox' };

function MyCheckbox({ disabled, label, type = 'unchecked' }) {
  const [checked, setChecked] = useState(type === 'checked');
  const [indeterminate, setIndeterminate] = useState(type === 'indeterminate');

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      id="checkbox-1"
      indeterminate={indeterminate}
      label={label}
      name="checkboxes"
      onChange={e => {
        setChecked(e.target.checked);
        setIndeterminate(e.target.indeterminate);
      }}
      value="checkbox-1"
    />
  );
}

export const Unchecked = () => <MyCheckbox type="unchecked" />;

export const Indeterminate = () => <MyCheckbox type="indeterminate" />;

export const Checked = () => <MyCheckbox type="checked" />;

export const Disabled = () => <MyCheckbox disabled />;

export const WithFormField = () => <MyCheckbox label="Checkbox 1" />;
